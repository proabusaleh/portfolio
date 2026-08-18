<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['name', 'email', 'company', 'phone', 'subject', 'message', 'unread', 'starred', 'folder', 'labels'];

    protected $casts = ['unread' => 'boolean', 'starred' => 'boolean', 'labels' => 'array'];
}
