<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->integer('order')->default(0);
            $table->string('icon');
            $table->string('title');
            $table->text('description');
            $table->json('features');
            $table->decimal('price_from', 10, 2)->default(0);
            $table->decimal('price_to', 10, 2)->default(0);
            $table->boolean('featured')->default(false);
            $table->string('color')->default('from-indigo-500 to-purple-500');
            $table->boolean('published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
