<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->json('categories');
            $table->text('description');
            $table->string('image');
            $table->json('tags');
            $table->string('year')->nullable();
            $table->string('badge')->nullable();
            $table->boolean('featured')->default(false);
            $table->decimal('rating', 2, 1)->default(0);
            $table->string('views')->nullable();
            $table->string('client')->nullable();
            $table->string('duration')->nullable();
            $table->string('completed')->nullable();
            $table->string('budget')->nullable();
            $table->json('tech_stack')->nullable();
            $table->json('gallery')->nullable();
            $table->text('overview')->nullable();
            $table->text('challenge')->nullable();
            $table->text('solution')->nullable();
            $table->json('results')->nullable();
            $table->string('demo_url')->nullable();
            $table->string('repo_url')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
