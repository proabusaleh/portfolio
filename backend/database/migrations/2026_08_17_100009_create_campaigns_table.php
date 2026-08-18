<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->string('preheader')->nullable();
            $table->string('from');
            $table->longText('content');
            $table->enum('status', ['draft', 'scheduled', 'sent'])->default('draft');
            $table->json('tags')->nullable();
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->integer('recipients')->default(0);
            $table->integer('opens')->default(0);
            $table->integer('clicks')->default(0);
            $table->integer('bounces')->default(0);
            $table->integer('unsubscribes')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
