<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('title', 'like', "%$s%")
                  ->orWhere('description', 'like', "%$s%")
                  ->orWhereJsonContains('tags', $s);
            });
        }

        if ($request->category)          $query->where('category', $request->category);
        if ($request->status)            $query->where('status', $request->status);
        if ($request->year)              $query->where('year', $request->year);
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
        return response()->json(Project::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255',
            'description' => 'required|string',
            'content'     => 'nullable|string',
            'images'      => 'nullable|array',
            'category'    => 'required|string',
            'tags'        => 'nullable|array',
            'tech_stack'  => 'nullable|array',
            'demo_url'    => 'nullable|url',
            'repo_url'    => 'nullable|url',
            'client'      => 'nullable|string',
            'duration'    => 'nullable|string',
            'year'        => 'required|integer',
            'status'      => 'required|in:draft,published,archived',
            'featured'    => 'boolean',
            'seo'         => 'nullable|array',
        ]);

        $data['slug']    = $data['slug'] ?? Str::slug($data['title']);
        $data['image']   = $data['images'][0] ?? null;
        $data['user_id'] = auth()->id();

        $project = Project::create($data);
        ActivityLog::log('create', 'Projects', $project->title);

        return response()->json($project, 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $data = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'slug'        => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'content'     => 'nullable|string',
            'images'      => 'nullable|array',
            'category'    => 'sometimes|string',
            'tags'        => 'nullable|array',
            'tech_stack'  => 'nullable|array',
            'demo_url'    => 'nullable|url',
            'repo_url'    => 'nullable|url',
            'client'      => 'nullable|string',
            'duration'    => 'nullable|string',
            'year'        => 'sometimes|integer',
            'status'      => 'sometimes|in:draft,published,archived',
            'featured'    => 'boolean',
            'seo'         => 'nullable|array',
        ]);

        if (isset($data['images'])) $data['image'] = $data['images'][0] ?? null;

        $project->update($data);
        ActivityLog::log('update', 'Projects', $project->title);

        return response()->json($project);
    }

    public function destroy(Request $request)
    {
        if ($request->has('ids')) {
            $count = Project::whereIn('id', $request->ids)->delete();
            ActivityLog::log('delete', 'Projects', "$count projects");
            return response()->json(['success' => true, 'count' => $count]);
        }
    }

    public function destroySingle($id)
    {
        $project = Project::findOrFail($id);
        $title   = $project->title;
        $project->delete();
        ActivityLog::log('delete', 'Projects', $title);
        return response()->json(['success' => true]);
    }

    public function bulkUpdate(Request $request)
    {
        $request->validate([
            'ids'     => 'required|array',
            'updates' => 'required|array',
        ]);

        $count = Project::whereIn('id', $request->ids)->update($request->updates);
        ActivityLog::log('update', 'Projects', "$count projects bulk-updated");

        return response()->json(['success' => true, 'count' => $count]);
    }

    public function duplicate($id)
    {
        $original = Project::findOrFail($id);
        $new      = $original->replicate();
        $new->title    = $original->title . ' (Copy)';
        $new->slug     = $original->slug . '-copy-' . time();
        $new->status   = 'draft';
        $new->featured = false;
        $new->views    = 0;
        $new->save();

        ActivityLog::log('create', 'Projects', "Duplicated: {$new->title}");
        return response()->json($new, 201);
    }
}
