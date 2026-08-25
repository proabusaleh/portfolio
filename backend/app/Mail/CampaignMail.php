<?php

namespace App\Mail;

use App\Models\Campaign;
use App\Models\Subscriber;
use App\Models\EmailLog;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class CampaignMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $trackingId;

    public function __construct(
        public Campaign $campaign,
        public Subscriber $subscriber
    ) {
        $this->trackingId = Str::uuid()->toString();
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: $this->campaign->from,
            replyTo: $this->campaign->reply_to ? [$this->campaign->reply_to] : [],
            subject: $this->campaign->subject,
        );
    }

    public function content(): Content
    {
        $trackingPixel = url("/api/track/open/{$this->trackingId}");
        $unsubUrl = $this->subscriber->unsubscribeUrl();

        // Inject tracking pixel & rewrite links
        $content = $this->campaign->content;

        if ($this->campaign->track_opens) {
            $content .= "\n\n<img src=\"{$trackingPixel}\" width=\"1\" height=\"1\" style=\"display:none\" alt=\"\">";
        }

        if ($this->campaign->track_clicks) {
            $content = preg_replace_callback(
                '/<a\s+([^>]*?)href=["\']([^"\']+)["\']([^>]*)>/i',
                function ($m) {
                    $encodedUrl = urlencode($m[2]);
                    $tracked = url("/api/track/click/{$this->trackingId}?url={$encodedUrl}");
                    return "<a {$m[1]}href=\"{$tracked}\"{$m[3]}>";
                },
                $content
            );
        }

        return new Content(
            markdown: 'emails.campaign',
            with: [
                'subject'         => $this->campaign->subject,
                'preheader'       => $this->campaign->preheader,
                'body'            => $content,
                'unsubscribeUrl'  => $unsubUrl,
                'name'            => $this->subscriber->name,
            ],
        );
    }

    public function build()
    {
        // Create log entry
        EmailLog::create([
            'to'          => $this->subscriber->email,
            'subject'     => $this->campaign->subject,
            'template'    => 'campaign',
            'type'        => 'campaign',
            'campaign_id' => $this->campaign->id,
            'status'      => 'queued',
            'tracking_id' => $this->trackingId,
        ]);

        return $this;
    }
}
