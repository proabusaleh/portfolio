<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AppNotification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $query = AppNotification::where('user_id', $request->user()->id);

        if ($request->type) $query->where('type', $request->type);

        return response()->json($query->latest()->paginate($request->pageSize ?? 20));
    }

    public function unreadCount(Request $request)
    {
        $count = AppNotification::where('user_id', $request->user()->id)
            ->where('read', false)
            ->count();

        return response()->json(['count' => $count]);
    }

    public function markRead($id)
    {
        $notification = AppNotification::findOrFail($id);
        $notification->update(['read' => true]);
        return response()->json($notification);
    }

    public function markAllRead(Request $request)
    {
        AppNotification::where('user_id', $request->user()->id)
            ->where('read', false)
            ->update(['read' => true]);

        return response()->json(['message' => 'All notifications marked as read']);
    }

    public function destroy($id)
    {
        AppNotification::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    public function clearAll(Request $request)
    {
        AppNotification::where('user_id', $request->user()->id)->delete();
        return response()->json(['message' => 'All notifications cleared']);
    }
}
