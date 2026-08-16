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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category');
            $table->string('cover_icon')->nullable();
            $table->string('cover_gradient')->nullable();
            $table->text('excerpt');
            $table->longText('content');
            $table->json('tags');
            $table->string('author');
            $table->string('author_avatar')->nullable();
            $table->string('author_role')->nullable();
            $table->unsignedInteger('read_minutes')->default(5);
            $table->string('views')->nullable();
            $table->unsignedInteger('likes')->default(0);
            $table->boolean('featured')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
