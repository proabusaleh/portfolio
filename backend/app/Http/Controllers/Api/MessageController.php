<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageReceived;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Services\EmailService;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $query = Message::query();

        if ($request->folder) $query->where('folder', $request->folder);
        if ($request->unread !== null) $query->where('unread', $request->unread === 'true');
        if ($request->starred !== null) $query->where('starred', $request->starred === 'true');

        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%$s%")
                  ->orWhere('email', 'like', "%$s%")
                  ->orWhere('subject', 'like', "%$s%")
                  ->orWhere('message', 'like', "%$s%");
            });
        }

        $sortBy    = $request->sortBy ?? 'created_at';
        $sortOrder = $request->sortOrder ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        $pageSize  = $request->pageSize ?? 20;
        $paginated = $query->paginate($pageSize);

        return response()->json([
            'data'       => $paginated->items(),
            'total'      => $paginated->total(),
            'page'       => $paginated->currentPage(),
            'pageSize'   => $paginated->perPage(),
            'totalPages' => $paginated->lastPage(),
            'unread'     => Message::where('unread', true)->count(),
            'starred'    => Message::where('starred', true)->count(),
        ]);
    }

    public function show($id)
    {
        $message = Message::findOrFail($id);
        $message->update(['unread' => false]);
        return response()->json($message);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string',
            'email'   => 'required|email',
            'company' => 'nullable|string',
            'phone'   => 'nullable|string',
            'subject' => 'nullable|string',
            'message' => 'required|string',
        ]);

        $data['unread']  = true;
        $data['starred'] = false;
        $data['folder']  = 'inbox';

        $message = Message::create($data);

        // Send auto-reply email
        $emailService = new EmailService();
        $emailService->sendContactAutoReply($message);

        // Broadcast in real-time
        broadcast(new MessageReceived($message))->toOthers();

        // Notify all admins
        NotificationService::notifyAdmins(
            type: 'message',
            title: "New inquiry from {$message->name}",
            extra: [
                'description' => substr($message->message, 0, 100),
                'actor'       => ['name' => $message->name, 'email' => $message->email],
                'link'        => '/messages',
                'priority'    => 'high',
            ]
        );

        return response()->json($message, 201);
    }

    public function update(Request $request, $id)
    {
        $message = Message::findOrFail($id);
        $message->update($request->only(['folder', 'labels', 'unread', 'starred']));
        return response()->json($message);
    }

    public function destroy($id)
    {
        Message::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    public function toggleStar($id)
    {
        $message = Message::findOrFail($id);
        $message->update(['starred' => !$message->starred]);
        return response()->json($message);
    }

    public function move(Request $request, $id)
    {
        $message = Message::findOrFail($id);
        $message->update(['folder' => $request->folder]);
        return response()->json($message);
    }

    public function markRead($id)
    {
        $message = Message::findOrFail($id);
        $message->update(['unread' => false]);
        return response()->json($message);
    }

    public function reply(Request $request, $id)
    {
        $message = Message::findOrFail($id);
        // TODO: send actual reply email
        return response()->json(['message' => 'Reply sent to ' . $message->email]);
    }
}
