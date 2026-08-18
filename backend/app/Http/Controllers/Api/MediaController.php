<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MediaFile;
use App\Models\MediaFolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = MediaFile::query();

        if ($request->folder && $request->folder !== 'root') {
            $folder = MediaFolder::where('slug', $request->folder)->first();
            if ($folder) $query->where('folder_id', $folder->id);
        }

        if ($request->type) $query->where('type', $request->type);

        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%$s%")
                  ->orWhereJsonContains('tags', $s);
            });
        }

        $sortBy    = $request->sortBy ?? 'created_at';
        $sortOrder = $request->sortOrder ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        return response()->json($query->get());
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file'   => 'required|file|max:20480',
            'folder' => 'nullable|string',
        ]);

        $file = $request->file('file');
        $path = $file->store('media', 'public');
        $url  = Storage::url($path);

        $type = 'file';
        if (str_starts_with($file->getMimeType(), 'image/'))        $type = 'image';
        elseif (str_starts_with($file->getMimeType(), 'video/'))    $type = 'video';
        elseif (str_starts_with($file->getMimeType(), 'application/')) $type = 'document';

        $folderId = null;
        if ($request->folder && $request->folder !== 'root') {
            $folderId = MediaFolder::where('slug', $request->folder)->value('id');
        }

        $dimensions = null;
        if ($type === 'image') {
            try {
                [$w, $h] = getimagesize($file->getRealPath());
                $dimensions = ['w' => $w, 'h' => $h];
            } catch (\Exception $e) {}
        }

        $media = MediaFile::create([
            'name'       => $file->getClientOriginalName(),
            'path'       => $path,
            'url'        => url($url),
            'thumbnail'  => url($url),
            'type'       => $type,
            'mime'       => $file->getMimeType(),
            'size'       => $file->getSize(),
            'dimensions' => $dimensions,
            'folder_id'  => $folderId,
            'user_id'    => auth()->id(),
        ]);

        return response()->json($media, 201);
    }

    public function destroy(Request $request)
    {
        $ids   = $request->input('ids', []);
        $files = MediaFile::whereIn('id', $ids)->get();

        foreach ($files as $file) {
            Storage::disk('public')->delete($file->path);
            $file->delete();
        }

        return response()->json(['success' => true, 'count' => count($files)]);
    }

    public function move(Request $request)
    {
        $folder = MediaFolder::where('slug', $request->folder)->first();
        $count  = MediaFile::whereIn('id', $request->ids)
            ->update(['folder_id' => $folder?->id]);

        return response()->json(['success' => true, 'count' => $count]);
    }

    public function folders()
    {
        return response()->json(MediaFolder::all());
    }

    public function createFolder(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        return response()->json(MediaFolder::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name) . '-' . time(),
        ]), 201);
    }

    public function deleteFolder($id)
    {
        $folder = MediaFolder::findOrFail($id);
        if ($folder->is_system) return response()->json(['error' => 'System folder'], 403);

        $folder->files()->update(['folder_id' => null]);
        $folder->delete();
        return response()->json(['success' => true]);
    }

    public function storage()
    {
        $used = MediaFile::sum('size');
        return response()->json([
            'used'  => (int) $used,
            'total' => 5 * 1024 * 1024 * 1024,
        ]);
    }

    public function folderCounts()
    {
        $counts = ['root' => MediaFile::count()];
        MediaFolder::all()->each(function ($f) use (&$counts) {
            $counts[$f->slug] = $f->files()->count();
        });
        return response()->json($counts);
    }
}
