@component('mail::message')
# {{ $subject }}

{{ $preheader }}

{!! $body !!}

---

@component('mail::button', ['url' => config('app.url')])
Visit Website
@endcomponent

If you no longer wish to receive these emails, you can unsubscribe: [Unsubscribe]({{ $unsubscribeUrl }})

Thanks,<br>
{{ config('app.name') }}
@endcomponent