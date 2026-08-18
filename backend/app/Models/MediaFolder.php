<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaFolder extends Model
{
    protected $fillable = ['name', 'slug', 'icon', 'parent_id', 'is_system'];

    protected $casts = ['is_system' => 'boolean'];

    public function files()
    {
        return $this->hasMany(MediaFile::class, 'folder_id');
    }
}
