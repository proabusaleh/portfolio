<?php

namespace App\Services;

use App\Jobs\SendEmailJob;
use App\Mail\ContactAutoReply;
use App\Mail\PasswordResetOtpMail;
use App\Mail\WelcomeSubscriberMail;
use App\Mail\CampaignMail;
use App\Mail\TestEmailMail;
use App\Mail\AdminNotificationMail;
use App\Models\EmailLog;
use App\Models\PasswordResetOtp;
use App\Models\Subscriber;
use App\Models\Campaign;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class EmailService
{
    /**
     * Send contact form auto-reply
     */
    public function sendContactAutoReply($message)
    {
        try {
            dispatch(new SendEmailJob(new ContactAutoReply($message), $message->email, 'high'));

            EmailLog::create([
                'to' => $message->email,
                'subject' => "Thanks for contacting me, {$message->name}!",
                'template' => 'contact-auto-reply',
                'type' => 'transactional',
                'status' => 'queued',
            ]);

            return true;
        } catch (\Exception $e) {
            EmailLog::create([
                'to' => $message->email,
                'subject' => "Thanks for contacting me, {$message->name}!",
                'template' => 'contact-auto-reply',
                'type' => 'transactional',
                'status' => 'failed',
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Send password reset OTP
     */
    public function sendPasswordResetOtp($email, $name, $expiresInMinutes = 10)
    {
        // Generate OTP
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Store OTP
        PasswordResetOtp::where('email', $email)->delete();

        PasswordResetOtp::create([
            'email' => $email,
            'otp' => $otp,
            'expires_at' => now()->addMinutes($expiresInMinutes),
        ]);

        try {
            dispatch(new SendEmailJob(new PasswordResetOtpMail($name, $otp, $expiresInMinutes), $email, 'high'));

            EmailLog::create([
                'to' => $email,
                'subject' => '🔐 Your Password Reset Code',
                'template' => 'password-reset-otp',
                'type' => 'transactional',
                'status' => 'queued',
            ]);

            return $otp;
        } catch (\Exception $e) {
            EmailLog::create([
                'to' => $email,
                'subject' => '🔐 Your Password Reset Code',
                'template' => 'password-reset-otp',
                'type' => 'transactional',
                'status' => 'failed',
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Verify password reset OTP
     */
    public function verifyPasswordResetOtp($email, $otp)
    {
        $resetOtp = PasswordResetOtp::where('email', $email)
            ->where('otp', $otp)
            ->first();

        if (!$resetOtp || !$resetOtp->isValid()) {
            return false;
        }

        // Mark as used
        $resetOtp->update(['used' => true]);

        return true;
    }

    /**
     * Send welcome email to new subscriber
     */
    public function sendWelcomeEmail($subscriber)
    {
        try {
            dispatch(new SendEmailJob(new WelcomeSubscriberMail($subscriber), $subscriber->email, 'default'));

            EmailLog::create([
                'to' => $subscriber->email,
                'subject' => '🎉 Welcome to the ' . config('app.name') . ' newsletter!',
                'template' => 'welcome-subscriber',
                'type' => 'transactional',
                'status' => 'queued',
            ]);

            return true;
        } catch (\Exception $e) {
            EmailLog::create([
                'to' => $subscriber->email,
                'subject' => '🎉 Welcome to the ' . config('app.name') . ' newsletter!',
                'template' => 'welcome-subscriber',
                'type' => 'transactional',
                'status' => 'failed',
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Send campaign email to subscriber (queued)
     */
    public function sendCampaignEmail($campaign, $subscriber)
    {
        try {
            dispatch(new SendEmailJob(new CampaignMail($campaign, $subscriber), $subscriber->email, 'default'))
                ->delay(now()->addSeconds(rand(1, 30)));

            return true;
        } catch (\Exception $e) {
            EmailLog::create([
                'to' => $subscriber->email,
                'subject' => $campaign->subject,
                'template' => 'campaign',
                'type' => 'campaign',
                'campaign_id' => $campaign->id,
                'status' => 'failed',
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Send campaign to all active subscribers
     */
    public function sendCampaignToSubscribers($campaign)
    {
        $subscribers = Subscriber::where('status', 'active')->get();

        $campaign->update([
            'total_recipients' => $subscribers->count(),
            'status' => 'scheduled',
        ]);

        foreach ($subscribers as $subscriber) {
            $this->sendCampaignEmail($campaign, $subscriber);
        }

        return $subscribers->count();
    }

    /**
     * Send test email
     */
    public function sendTestEmail($recipient)
    {
        try {
            dispatch(new SendEmailJob(new TestEmailMail($recipient), $recipient, 'high'));

            EmailLog::create([
                'to' => $recipient,
                'subject' => '✅ SMTP Test Email from ' . config('app.name'),
                'template' => 'test',
                'type' => 'test',
                'status' => 'queued',
            ]);

            return true;
        } catch (\Exception $e) {
            EmailLog::create([
                'to' => $recipient,
                'subject' => '✅ SMTP Test Email from ' . config('app.name'),
                'template' => 'test',
                'type' => 'test',
                'status' => 'failed',
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Send admin notification
     */
    public function sendAdminNotification($title, $body, $actionUrl = null, $actionText = null)
    {
        $adminEmail = config('mail.from.address');

        try {
            dispatch(new SendEmailJob(new AdminNotificationMail($title, $body, $actionUrl, $actionText), $adminEmail, 'high'));

            EmailLog::create([
                'to' => $adminEmail,
                'subject' => '🔔 ' . $title,
                'template' => 'admin-notification',
                'type' => 'transactional',
                'status' => 'queued',
            ]);

            return true;
        } catch (\Exception $e) {
            EmailLog::create([
                'to' => $adminEmail,
                'subject' => '🔔 ' . $title,
                'template' => 'admin-notification',
                'type' => 'transactional',
                'status' => 'failed',
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Get email statistics
     */
    public function getEmailStats($campaignId = null)
    {
        $query = EmailLog::query();

        if ($campaignId) {
            $query->where('campaign_id', $campaignId);
        }

        return [
            'total' => $query->count(),
            'sent' => $query->where('status', 'sent')->count(),
            'failed' => $query->where('status', 'failed')->count(),
            'queued' => $query->where('status', 'queued')->count(),
            'opened' => $query->whereNotNull('opened_at')->count(),
            'clicked' => $query->whereNotNull('clicked_at')->count(),
        ];
    }
}