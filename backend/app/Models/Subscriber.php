<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $fillable = [
        'name', 'email', 'status', 'tags', 'subscribed_at', 'last_open_at',
        'unsubscribe_token', 'unsubscribed_at',
    ];

    protected $casts = [
        'tags'             => 'array',
        'subscribed_at'    => 'datetime',
        'last_open_at'     => 'datetime',
        'unsubscribed_at'  => 'datetime',
    ];

    // Auto-generate token on create
    protected static function booted()
    {
        static::creating(function ($subscriber) {
            $subscriber->unsubscribe_token = $subscriber->unsubscribe_token ?? bin2hex(random_bytes(32));
            $subscriber->subscribed_at = $subscriber->subscribed_at ?? now();
        });
    }

    public function unsubscribeUrl(): string
    {
        return url('/api/unsubscribe/' . $this->unsubscribe_token);
    }
}
