<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaFile extends Model
{
    protected $fillable = ['name', 'path', 'url', 'thumbnail', 'type', 'mime', 'size', 'dimensions', 'folder_id', 'tags', 'user_id'];

    protected $casts = ['dimensions' => 'array', 'tags' => 'array', 'size' => 'integer'];

    public function folder()
    {
        return $this->belongsTo(MediaFolder::class);
    }
}
