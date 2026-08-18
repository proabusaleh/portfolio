<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['order', 'icon', 'title', 'description', 'features', 'price_from', 'price_to', 'featured', 'color', 'published'];

    protected $casts = [
        'features'   => 'array',
        'featured'   => 'boolean',
        'published'  => 'boolean',
        'price_from' => 'decimal:2',
        'price_to'   => 'decimal:2',
    ];
}
