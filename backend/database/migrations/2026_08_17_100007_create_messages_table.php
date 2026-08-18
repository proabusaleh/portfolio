<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('phone')->nullable();
            $table->string('subject');
            $table->longText('message');
            $table->boolean('unread')->default(true);
            $table->boolean('starred')->default(false);
            $table->enum('folder', ['inbox', 'archived', 'spam'])->default('inbox');
            $table->json('labels')->nullable();
            $table->timestamps();

            $table->index(['folder', 'unread']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
