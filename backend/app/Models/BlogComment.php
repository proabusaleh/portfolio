<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogComment extends Model
{
    protected $fillable = ['post_id', 'author', 'email', 'avatar', 'content', 'status', 'likes'];

    public function post()
    {
        return $this->belongsTo(BlogPost::class, 'post_id');
    }
}
