<?php

namespace App\Http\Controllers;

use App\Models\EmailLog;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class EmailTrackingController extends Controller
{
    public function trackOpen($trackingId)
    {
        $log = EmailLog::where('tracking_id', $trackingId)->first();

        if ($log) {
            $log->opened_at = now();
            $log->open_count = $log->open_count + 1;
            $log->save();

            // Update subscriber last open
            if ($log->campaign && $log->campaign->track_opens) {
                $log->campaign->increment('opens');
            }
        }

        // Return 1x1 transparent pixel
        return Response::make(base64_decode('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw=='), 200, [
            'Content-Type' => 'image/gif',
            'Cache-Control' => 'no-store, no-cache, must-revalidate',
            'Pragma' => 'no-cache',
        ]);
    }

    public function trackClick($trackingId, Request $request)
    {
        $log = EmailLog::where('tracking_id', $trackingId)->first();

        if ($log) {
            $log->clicked_at = now();
            $log->click_count = $log->click_count + 1;
            $log->save();

            // Update campaign clicks
            if ($log->campaign && $log->campaign->track_clicks) {
                $log->campaign->increment('clicks');
            }
        }

        $url = $request->query('url');
        if ($url) {
            return redirect(urldecode($url));
        }

        return redirect(config('app.url'));
    }

    public function unsubscribe($token)
    {
        $subscriber = Subscriber::where('unsubscribe_token', $token)->first();

        if (!$subscriber) {
            return response()->json(['message' => 'Invalid unsubscribe link'], 404);
        }

        $subscriber->update([
            'status' => 'unsubscribed',
            'unsubscribed_at' => now(),
        ]);

        // Update campaign unsubscribe count if tracking exists
        EmailLog::where('to', $subscriber->email)
            ->where('type', 'campaign')
            ->where('status', 'sent')
            ->each(function ($log) {
                if ($log->campaign) {
                    $log->campaign->increment('unsubscribes');
                }
            });

        return response()->json(['message' => 'Successfully unsubscribed']);
    }
}
