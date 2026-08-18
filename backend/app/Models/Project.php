<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'description', 'content', 'image', 'images',
        'category', 'tags', 'tech_stack', 'demo_url', 'repo_url',
        'client', 'duration', 'year', 'status', 'featured', 'views',
        'seo', 'user_id',
    ];

    protected $casts = [
        'images'     => 'array',
        'tags'       => 'array',
        'tech_stack' => 'array',
        'seo'        => 'array',
        'featured'   => 'boolean',
        'year'       => 'integer',
        'views'      => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
