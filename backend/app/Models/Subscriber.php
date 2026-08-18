<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $fillable = ['name', 'email', 'status', 'tags', 'subscribed_at', 'last_open_at'];

    protected $casts = [
        'tags'          => 'array',
        'subscribed_at' => 'datetime',
        'last_open_at'  => 'datetime',
    ];
}
