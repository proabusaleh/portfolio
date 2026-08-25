<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TestEmailMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public string $recipient) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '✅ SMTP Test Email from ' . config('app.name'),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.test',
            with: [
                'recipient' => $this->recipient,
                'appName'   => config('app.name'),
                'sentAt'    => now()->format('F j, Y \a\t g:i A'),
            ],
        );
    }
}
