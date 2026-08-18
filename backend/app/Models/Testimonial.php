<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['name', 'role', 'company', 'avatar', 'rating', 'quote', 'project_type', 'status', 'featured', 'email', 'website', 'date'];

    protected $casts = ['featured' => 'boolean', 'rating' => 'integer', 'date' => 'date'];
}
