@component('mail::message')
# SMTP Test Email

Hi {{ $recipient }},

This is a test email from {{ $appName }} to verify your SMTP configuration is working correctly.

**Test Details:**
- **Recipient:** {{ $recipient }}
- **Sent At:** {{ $sentAt }}
- **Application:** {{ $appName }}

If you received this email, your mail settings are configured correctly!

@component('mail::button', ['url' => config('app.url')])
Visit Website
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent