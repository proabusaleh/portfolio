<?php

namespace Database\Seeders;

use App\Models\MediaFolder;
use Illuminate\Database\Seeder;

class MediaFolderSeeder extends Seeder
{
    public function run(): void
    {
        $folders = [
            ['name' => 'Projects',     'slug' => 'projects',     'icon' => 'folder'],
            ['name' => 'Blog Images',  'slug' => 'blog',         'icon' => 'document'],
            ['name' => 'Avatars',      'slug' => 'avatars',      'icon' => 'user'],
            ['name' => 'Testimonials', 'slug' => 'testimonials', 'icon' => 'chat'],
            ['name' => 'Documents',    'slug' => 'documents',    'icon' => 'file'],
        ];

        foreach ($folders as $f) {
            MediaFolder::firstOrCreate(['slug' => $f['slug']], $f);
        }
    }
}
