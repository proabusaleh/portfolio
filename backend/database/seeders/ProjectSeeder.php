<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            ['title' => 'E-commerce Fashion Store', 'category' => 'WooCommerce', 'year' => 2024, 'featured' => true],
            ['title' => 'Fitness Tracker Mobile App', 'category' => 'Flutter', 'year' => 2024, 'featured' => true],
            ['title' => 'Corporate Website Redesign', 'category' => 'WordPress', 'year' => 2024, 'status' => 'draft'],
            ['title' => 'Ride-Sharing App', 'category' => 'Flutter', 'year' => 2024, 'featured' => true],
            ['title' => 'Real Estate Portal', 'category' => 'WordPress', 'year' => 2023],
        ];

        foreach ($projects as $data) {
            Project::create(array_merge([
                'slug'        => Str::slug($data['title']),
                'description' => "Beautiful {$data['category']} project",
                'image'       => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
                'status'      => $data['status'] ?? 'published',
                'views'       => rand(500, 5000),
                'tags'        => ['portfolio', strtolower($data['category'])],
            ], $data));
        }
    }
}
