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
        Schema::table('campaigns', function (Blueprint $table) {
            $table->string('reply_to')->nullable()->after('from');
            $table->boolean('track_opens')->default(true)->after('unsubscribes');
            $table->boolean('track_clicks')->default(true)->after('track_opens');
            $table->integer('total_recipients')->default(0)->after('recipients');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropColumn(['reply_to', 'track_opens', 'track_clicks', 'total_recipients']);
        });
    }
};
