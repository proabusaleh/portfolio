@component('mail::message')
# {{ $title }}

{{ $body }}

@if($actionUrl && $actionText)
@component('mail::button', ['url' => $actionUrl])
{{ $actionText }}
@endcomponent
@endif

This is an automated notification from {{ config('app.name') }}.

Thanks,<br>
{{ config('app.name') }}
@endcomponent