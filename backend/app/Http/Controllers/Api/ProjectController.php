<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->has('category')) {
            $category = $request->input('category');
            $query->whereJsonContains('categories', $category);
        }

        if ($request->has('featured')) {
            $query->where('featured', true);
        }

        $projects = $query->orderBy('sort_order')->get();

        return response()->json([
            'data' => $projects,
        ]);
    }

    public function show(string $slug)
    {
        $project = Project::where('slug', $slug)->first();

        if (! $project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $related = Project::where('id', '!=', $project->id)
            ->where(function ($q) use ($project) {
                foreach ($project->categories as $category) {
                    $q->orWhereJsonContains('categories', $category);
                }
            })
            ->orderBy('sort_order')
            ->limit(3)
            ->get();

        return response()->json([
            'data' => $project,
            'related' => $related,
        ]);
    }
}
