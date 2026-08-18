<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'excerpt', 'content', 'cover_image', 'category',
        'tags', 'author', 'status', 'published_at', 'scheduled_at',
        'read_time', 'views', 'likes', 'shares', 'seo', 'user_id',
    ];

    protected $casts = [
        'tags'         => 'array',
        'seo'          => 'array',
        'published_at' => 'datetime',
        'scheduled_at' => 'datetime',
    ];

    public function comments()
    {
        return $this->hasMany(BlogComment::class, 'post_id');
    }
}
