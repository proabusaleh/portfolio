<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@portfolio.com'],
            [
                'name'     => 'Abu Saleh',
                'password' => 'admin123',
                'status'   => 'active',
            ]
        );
        $admin->assignRole('admin');

        $editor = User::firstOrCreate(
            ['email' => 'editor@portfolio.com'],
            [
                'name'     => 'Editor User',
                'password' => 'editor123',
                'status'   => 'active',
            ]
        );
        $editor->assignRole('editor');
    }
}
