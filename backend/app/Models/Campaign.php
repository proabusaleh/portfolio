<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $fillable = [
        'subject', 'preheader', 'from', 'reply_to', 'content', 'status', 'tags',
        'scheduled_at', 'sent_at', 'recipients', 'total_recipients', 'opens',
        'clicks', 'bounces', 'unsubscribes', 'track_opens', 'track_clicks'
    ];

    protected $casts = [
        'tags'         => 'array',
        'scheduled_at' => 'datetime',
        'sent_at'      => 'datetime',
    ];
}
