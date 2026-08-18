<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppNotification extends Model
{
    protected $table = 'app_notifications';

    protected $fillable = ['user_id', 'type', 'title', 'description', 'actor', 'link', 'priority', 'read'];

    protected $casts = ['actor' => 'array', 'read' => 'boolean'];
}
