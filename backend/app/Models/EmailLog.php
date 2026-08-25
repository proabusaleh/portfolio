<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
    protected $fillable = [
        'to', 'subject', 'template', 'type', 'campaign_id', 'status',
        'error', 'sent_at', 'opened_at', 'clicked_at',
        'open_count', 'click_count', 'tracking_id',
    ];

    protected $casts = [
        'sent_at'    => 'datetime',
        'opened_at'  => 'datetime',
        'clicked_at' => 'datetime',
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
}
