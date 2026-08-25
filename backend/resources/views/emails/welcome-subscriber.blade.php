@component('mail::message')
# Welcome to {{ config('app.name') }}!

Hi {{ $name }},

Thanks for subscribing to our newsletter! You're now part of our community and will receive updates, tips, and exclusive content.

We're excited to have you on board!

@component('mail::button', ['url' => config('app.url')])
Explore Our Content
@endcomponent

If you ever want to unsubscribe, you can do so here: [{{ $unsubscribeUrl }}]({{ $unsubscribeUrl }})

Thanks,<br>
{{ config('app.name') }}
@endcomponent