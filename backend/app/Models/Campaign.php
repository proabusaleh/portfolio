<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $fillable = ['subject', 'preheader', 'from', 'content', 'status', 'tags', 'scheduled_at', 'sent_at', 'recipients', 'opens', 'clicks', 'bounces', 'unsubscribes'];

    protected $casts = [
        'tags'         => 'array',
        'scheduled_at' => 'datetime',
        'sent_at'      => 'datetime',
    ];
}
