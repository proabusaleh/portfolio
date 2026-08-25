@component('mail::message')
# Password Reset Code

Hi {{ $name }},

You requested a password reset. Here's your verification code:

## {{ $otp }}

This code will expire in {{ $expiresInMinutes }} minutes.

If you didn't request this code, you can safely ignore this email.

@component('mail::button', ['url' => config('app.url')])
Return to Website
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent