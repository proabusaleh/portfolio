<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $otp,
        public int $expiresInMinutes = 10
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🔐 Your Password Reset Code',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.password-reset-otp',
            with: [
                'name' => $this->name,
                'otp'  => $this->otp,
                'expiresInMinutes' => $this->expiresInMinutes,
            ],
        );
    }
}
