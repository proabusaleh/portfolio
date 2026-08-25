<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->enum('status', ['active', 'unsubscribed', 'bounced'])->default('active');
            $table->json('tags')->nullable();
            $table->string('unsubscribe_token', 64)->nullable()->unique()->after('tags');
            $table->timestamp('unsubscribed_at')->nullable()->after('unsubscribe_token');
            $table->timestamp('subscribed_at')->nullable();
            $table->timestamp('last_open_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscribers');
    }
};
