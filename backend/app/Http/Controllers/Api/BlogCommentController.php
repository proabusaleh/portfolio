<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogComment;
use Illuminate\Http\Request;

class BlogCommentController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogComment::with('post');

        if ($request->post_id) $query->where('post_id', $request->post_id);
        if ($request->status)  $query->where('status', $request->status);

        return response()->json($query->latest()->paginate($request->pageSize ?? 20));
    }

    public function update(Request $request, $id)
    {
        $comment = BlogComment::findOrFail($id);
        $comment->update($request->only(['content', 'status']));
        return response()->json($comment);
    }

    public function destroy($id)
    {
        BlogComment::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }
}
