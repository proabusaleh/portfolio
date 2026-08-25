@component('mail::message')
# Thanks for reaching out!

Hi {{ $name }},

Thanks for contacting me regarding "{{ $subject }}". I've received your message and will get back to you as soon as possible.

Best regards,

{{ $authorName }}

@component('mail::button', ['url' => config('app.url')])
Visit Website
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent