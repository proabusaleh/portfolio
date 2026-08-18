<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = ['order', 'name', 'icon', 'category', 'proficiency', 'color'];

    protected $casts = ['proficiency' => 'integer'];
}
