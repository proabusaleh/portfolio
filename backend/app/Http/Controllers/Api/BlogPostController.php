<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogPostController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogPost::query();

        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('title', 'like', "%$s%")
                  ->orWhere('excerpt', 'like', "%$s%")
                  ->orWhereJsonContains('tags', $s);
            });
        }

        if ($request->category)          $query->where('category', $request->category);
        if ($request->status)            $query->where('status', $request->status);
        if ($request->featured !== null) $query->where('featured', $request->featured === 'true');

        $sortBy    = $request->sortBy ?? 'created_at';
        $sortOrder = $request->sortOrder ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        $pageSize  = $request->pageSize ?? 10;
        $paginated = $query->paginate($pageSize);

        return response()->json([
            'data'       => $paginated->items(),
            'total'      => $paginated->total(),
            'page'       => $paginated->currentPage(),
            'pageSize'   => $paginated->perPage(),
            'totalPages' => $paginated->lastPage(),
        ]);
    }

    public function show($id)
    {
        return response()->json(BlogPost::with('comments')->findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'         => 'required|string|max:255',
            'slug'          => 'nullable|string|max:255',
            'excerpt'       => 'nullable|string',
            'content'       => 'required|string',
            'cover_image'   => 'nullable|string',
            'category'      => 'required|string',
            'tags'          => 'nullable|array',
            'author'        => 'nullable|string',
            'status'        => 'required|in:draft,published,scheduled',
            'published_at'  => 'nullable|date',
            'scheduled_at'  => 'nullable|date',
            'read_time'     => 'nullable|integer',
            'seo'           => 'nullable|array',
        ]);

        $data['slug']    = $data['slug'] ?? Str::slug($data['title']);
        $data['author']  = $data['author'] ?? auth()->user()->name;
        $data['user_id'] = auth()->id();

        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $post = BlogPost::create($data);
        ActivityLog::log('create', 'Blog', $post->title);

        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $post = BlogPost::findOrFail($id);
        $data = $request->validate([
            'title'         => 'sometimes|string|max:255',
            'slug'          => 'sometimes|string|max:255',
            'excerpt'       => 'nullable|string',
            'content'       => 'sometimes|string',
            'cover_image'   => 'nullable|string',
            'category'      => 'sometimes|string',
            'tags'          => 'nullable|array',
            'author'        => 'nullable|string',
            'status'        => 'sometimes|in:draft,published,scheduled',
            'published_at'  => 'nullable|date',
            'scheduled_at'  => 'nullable|date',
            'read_time'     => 'nullable|integer',
            'seo'           => 'nullable|array',
        ]);

        if (isset($data['status']) && $data['status'] === 'published' && empty($post->published_at)) {
            $data['published_at'] = now();
        }

        $post->update($data);
        ActivityLog::log('update', 'Blog', $post->title);

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post  = BlogPost::findOrFail($id);
        $title = $post->title;
        $post->delete();
        ActivityLog::log('delete', 'Blog', $title);
        return response()->json(['success' => true]);
    }
}
