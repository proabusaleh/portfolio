<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()['cache']->forget('spatie.permission.cache');

        $permissions = [
            'projects.view', 'projects.create', 'projects.edit', 'projects.delete',
            'blog.view', 'blog.create', 'blog.edit', 'blog.publish', 'blog.delete',
            'messages.view', 'messages.reply', 'messages.delete',
            'media.view', 'media.upload', 'media.delete',
            'users.view', 'users.invite', 'users.edit', 'users.delete',
            'settings.view', 'settings.edit',
        ];

        foreach ($permissions as $p) {
            Permission::firstOrCreate(['name' => $p]);
        }

        Role::firstOrCreate(['name' => 'admin'])->syncPermissions($permissions);

        Role::firstOrCreate(['name' => 'editor'])->syncPermissions([
            'projects.view', 'projects.create', 'projects.edit', 'projects.delete',
            'blog.view', 'blog.create', 'blog.edit', 'blog.publish', 'blog.delete',
            'messages.view', 'messages.reply', 'messages.delete',
            'media.view', 'media.upload', 'media.delete',
            'settings.view',
        ]);

        Role::firstOrCreate(['name' => 'author'])->syncPermissions([
            'projects.view', 'projects.create', 'projects.edit',
            'blog.view', 'blog.create', 'blog.edit',
            'messages.view', 'messages.reply',
            'media.view', 'media.upload',
        ]);

        Role::firstOrCreate(['name' => 'viewer'])->syncPermissions([
            'projects.view', 'blog.view', 'messages.view', 'media.view', 'settings.view',
        ]);
    }
}
