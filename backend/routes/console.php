<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule campaigns to be sent every minute
Schedule::command('campaigns:send-scheduled')
    ->everyMinute()
    ->withoutOverlapping()
    ->runInBackground()
    ->description('Send scheduled email campaigns');

// Broadcast real-time analytics every minute
Schedule::command('analytics:broadcast-realtime')
    ->everyMinute()
    ->withoutOverlapping()
    ->runInBackground()
    ->description('Broadcast active users to admins');
