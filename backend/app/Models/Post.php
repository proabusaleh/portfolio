<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title', 'slug', 'category', 'cover_icon', 'cover_gradient', 'excerpt',
        'content', 'tags', 'author', 'author_avatar', 'author_role',
        'read_minutes', 'views', 'likes', 'featured', 'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'featured' => 'boolean',
        'published_at' => 'datetime',
    ];
}
