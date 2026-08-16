<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'slug', 'categories', 'description', 'image', 'tags', 'year',
        'badge', 'featured', 'rating', 'views', 'client', 'duration', 'completed',
        'budget', 'tech_stack', 'gallery', 'overview', 'challenge', 'solution',
        'results', 'demo_url', 'repo_url', 'sort_order',
    ];

    protected $casts = [
        'categories' => 'array',
        'tags' => 'array',
        'tech_stack' => 'array',
        'gallery' => 'array',
        'results' => 'array',
        'featured' => 'boolean',
        'rating' => 'float',
    ];
}
