<?php

namespace App\Http\Controllers;

use App\Models\EmailLog;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmailWebhookController extends Controller
{
    /**
     * Handle AWS SES bounce notifications
     */
    public function handleSesBounce(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['Records'])) {
            return response()->json(['message' => 'Invalid request'], 400);
        }

        foreach ($data['Records'] as $record) {
            $message = json_decode($record['Sns']['Message'], true);

            if (isset($message['bounce'])) {
                $this->processBounce($message['bounce']);
            }
        }

        return response()->json(['message' => 'Bounce processed']);
    }

    /**
     * Handle AWS SES complaint notifications
     */
    public function handleSesComplaint(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['Records'])) {
            return response()->json(['message' => 'Invalid request'], 400);
        }

        foreach ($data['Records'] as $record) {
            $message = json_decode($record['Sns']['Message'], true);

            if (isset($message['complaint'])) {
                $this->processComplaint($message['complaint']);
            }
        }

        return response()->json(['message' => 'Complaint processed']);
    }

    /**
     * Handle AWS SES delivery notifications
     */
    public function handleSesDelivery(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['Records'])) {
            return response()->json(['message' => 'Invalid request'], 400);
        }

        foreach ($data['Records'] as $record) {
            $message = json_decode($record['Sns']['Message'], true);

            if (isset($message['delivery'])) {
                $this->processDelivery($message['delivery']);
            }
        }

        return response()->json(['message' => 'Delivery processed']);
    }

    /**
     * Process bounce notification
     */
    protected function processBounce($bounce)
    {
        $bounceType = $bounce['bounceType']; // Permanent, Transient, Undetermined
        $bounceSubType = $bounce['bounceSubType'];

        foreach ($bounce['bouncedRecipients'] as $recipient) {
            $email = $recipient['emailAddress'];

            // Update email log
            EmailLog::where('to', $email)
                ->where('status', '!=', 'bounced')
                ->update([
                    'status' => 'bounced',
                    'error' => "Bounce: {$bounceType} - {$bounceSubType}",
                ]);

            // If permanent bounce, mark subscriber as bounced
            if ($bounceType === 'Permanent') {
                Subscriber::where('email', $email)->update([
                    'status' => 'bounced',
                ]);

                // Update campaign bounce count
                EmailLog::where('to', $email)
                    ->where('type', 'campaign')
                    ->whereNotNull('campaign_id')
                    ->each(function ($log) {
                        if ($log->campaign) {
                            $log->campaign->increment('bounces');
                        }
                    });
            }

            Log::info("Email bounced: {$email} - {$bounceType} - {$bounceSubType}");
        }
    }

    /**
     * Process complaint notification
     */
    protected function processComplaint($complaint)
    {
        $complaintFeedbackType = $complaint['complaintFeedbackType'] ?? 'Unknown';

        foreach ($complaint['complainedRecipients'] as $recipient) {
            $email = $recipient['emailAddress'];

            // Update email log
            EmailLog::where('to', $email)
                ->where('status', '!=', 'bounced')
                ->update([
                    'status' => 'bounced',
                    'error' => "Complaint: {$complaintFeedbackType}",
                ]);

            // Unsubscribe the user
            Subscriber::where('email', $email)->update([
                'status' => 'unsubscribed',
                'unsubscribed_at' => now(),
            ]);

            // Update campaign unsubscribe count
            EmailLog::where('to', $email)
                ->where('type', 'campaign')
                ->whereNotNull('campaign_id')
                ->each(function ($log) {
                    if ($log->campaign) {
                        $log->campaign->increment('unsubscribes');
                    }
                });

            Log::info("Email complaint: {$email} - {$complaintFeedbackType}");
        }
    }

    /**
     * Process delivery notification
     */
    protected function processDelivery($delivery)
    {
        $email = $delivery['recipients'][0] ?? null;

        if ($email) {
            // Update email log
            EmailLog::where('to', $email)
                ->where('status', 'queued')
                ->update([
                    'status' => 'sent',
                    'sent_at' => now(),
                ]);

            Log::info("Email delivered: {$email}");
        }
    }

    /**
     * Generic webhook handler for other providers (SendGrid, Mailgun, etc.)
     */
    public function handleGenericWebhook(Request $request)
    {
        $data = $request->all();

        // Detect provider based on request structure
        if (isset($data[0]['event'])) {
            // SendGrid format
            return $this->handleSendGridWebhook($data);
        } elseif (isset($data['event-data'])) {
            // Mailgun format
            return $this->handleMailgunWebhook($data);
        }

        return response()->json(['message' => 'Unknown webhook format'], 400);
    }

    /**
     * Handle SendGrid webhook
     */
    protected function handleSendGridWebhook($events)
    {
        foreach ($events as $event) {
            $email = $event['email'] ?? null;
            $eventType = $event['event'] ?? null;

            if (!$email) continue;

            switch ($eventType) {
                case 'bounce':
                case 'dropped':
                    EmailLog::where('to', $email)->update([
                        'status' => 'bounced',
                        'error' => $event['reason'] ?? 'Unknown',
                    ]);
                    Subscriber::where('email', $email)->update(['status' => 'bounced']);
                    break;

                case 'spamreport':
                    EmailLog::where('to', $email)->update([
                        'status' => 'bounced',
                        'error' => 'Spam complaint',
                    ]);
                    Subscriber::where('email', $email)->update([
                        'status' => 'unsubscribed',
                        'unsubscribed_at' => now(),
                    ]);
                    break;

                case 'delivered':
                    EmailLog::where('to', $email)
                        ->where('status', 'queued')
                        ->update([
                            'status' => 'sent',
                            'sent_at' => now(),
                        ]);
                    break;
            }
        }

        return response()->json(['message' => 'SendGrid webhook processed']);
    }

    /**
     * Handle Mailgun webhook
     */
    protected function handleMailgunWebhook($data)
    {
        $eventData = $data['event-data'];
        $email = $eventData['recipient'] ?? null;
        $eventType = $data['event-name'] ?? null;

        if (!$email) {
            return response()->json(['message' => 'No email in webhook'], 400);
        }

        switch ($eventType) {
            case 'failed':
                EmailLog::where('to', $email)->update([
                    'status' => 'bounced',
                    'error' => $eventData['reason'] ?? 'Unknown',
                ]);
                Subscriber::where('email', $email)->update(['status' => 'bounced']);
                break;

            case 'complained':
                EmailLog::where('to', $email)->update([
                    'status' => 'bounced',
                    'error' => 'Spam complaint',
                ]);
                Subscriber::where('email', $email)->update([
                    'status' => 'unsubscribed',
                    'unsubscribed_at' => now(),
                ]);
                break;

            case 'delivered':
                EmailLog::where('to', $email)
                    ->where('status', 'queued')
                    ->update([
                        'status' => 'sent',
                        'sent_at' => now(),
                    ]);
                break;
        }

        return response()->json(['message' => 'Mailgun webhook processed']);
    }
}
