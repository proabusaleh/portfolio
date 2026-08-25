<?php

namespace App\Mail;

use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeSubscriberMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Subscriber $subscriber) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🎉 Welcome to the ' . config('app.name') . ' newsletter!',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.welcome-subscriber',
            with: [
                'name'            => $this->subscriber->name,
                'unsubscribeUrl'  => $this->subscriber->unsubscribeUrl(),
            ],
        );
    }
}
