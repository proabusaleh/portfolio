<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::query()->whereNotNull('published_at');

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->has('featured')) {
            $query->where('featured', true);
        }

        $posts = $query->orderByDesc('published_at')->get();

        return response()->json([
            'data' => $posts,
        ]);
    }

    public function show(string $slug)
    {
        $post = Post::where('slug', $slug)->whereNotNull('published_at')->first();

        if (! $post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json([
            'data' => $post,
        ]);
    }
}
