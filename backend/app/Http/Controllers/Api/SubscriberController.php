<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use App\Services\EmailService;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function index(Request $request)
    {
        $query = Subscriber::query();

        if ($request->status) $query->where('status', $request->status);

        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%$s%")
                  ->orWhere('email', 'like', "%$s%");
            });
        }

        return response()->json($query->latest()->paginate($request->pageSize ?? 20));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'  => 'nullable|string',
            'email' => 'required|email|unique:subscribers,email',
            'tags'  => 'nullable|array',
        ]);

        $data['status']       = 'active';
        $data['subscribed_at'] = now();

        $subscriber = Subscriber::create($data);

        // Send welcome email
        $emailService = new EmailService();
        $emailService->sendWelcomeEmail($subscriber);

        // Real-time notification for new subscriber
        NotificationService::notifyAdmins(
            type: 'subscriber',
            title: "New subscriber: {$subscriber->name}",
            extra: [
                'description' => $subscriber->email,
                'actor'       => ['name' => $subscriber->name],
                'link'        => '/newsletter',
            ]
        );

        return response()->json($subscriber, 201);
    }

    public function show($id)
    {
        return Subscriber::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $subscriber = Subscriber::findOrFail($id);
        $subscriber->update($request->only(['name', 'status', 'tags']));
        return response()->json($subscriber);
    }

    public function destroy($id)
    {
        Subscriber::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }
}
