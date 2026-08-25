<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Services\EmailService;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function index(Request $request)
    {
        $query = Campaign::query();

        if ($request->status) $query->where('status', $request->status);

        return response()->json($query->latest()->paginate($request->pageSize ?? 20));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'subject'    => 'required|string',
            'preheader'  => 'nullable|string',
            'from'       => 'nullable|string',
            'content'    => 'required|string',
            'tags'       => 'nullable|array',
            'scheduled_at' => 'nullable|date',
        ]);

        $data['status'] = $request->scheduled_at ? 'scheduled' : 'draft';

        return response()->json(Campaign::create($data), 201);
    }

    public function show($id)
    {
        return Campaign::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $campaign = Campaign::findOrFail($id);
        $campaign->update($request->all());
        return response()->json($campaign);
    }

    public function destroy($id)
    {
        Campaign::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    public function send(Request $request, $id)
    {
        $campaign = Campaign::findOrFail($id);

        if ($campaign->status === 'sent') {
            return response()->json(['message' => 'Campaign already sent'], 400);
        }

        $emailService = new EmailService();
        $recipientCount = $emailService->sendCampaignToSubscribers($campaign);

        $campaign->update([
            'status'     => 'sent',
            'sent_at'    => now(),
        ]);

        return response()->json(['message' => 'Campaign sent', 'recipients' => $recipientCount]);
    }

    public function sendTest(Request $request, $id)
    {
        $campaign = Campaign::findOrFail($id);
        $request->validate(['email' => 'required|email']);

        $emailService = new EmailService();
        $success = $emailService->sendTestEmail($request->email);

        if ($success) {
            return response()->json(['message' => "Test email sent to {$request->email}"]);
        }

        return response()->json(['message' => 'Failed to send test email'], 500);
    }
}
