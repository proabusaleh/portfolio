<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class BroadcastRealtimeAnalytics extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'analytics:broadcast-realtime';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Broadcast active users to admins every minute';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            // Only attempt if GA is configured
            if (!config('analytics.property_id') || !file_exists(config('analytics.service_account_credentials_json'))) {
                $this->info('Google Analytics not configured, skipping broadcast');
                return 0;
            }

            $result = \Spatie\Analytics\Facades\Analytics::get(
                \Spatie\Analytics\Period::days(1),
                ['activeUsers'],
                [],
                10
            );
            $active = collect($result)->sum('activeUsers');

            // Broadcast to admin channel
            broadcast(new \App\Events\RealtimeVisitors($active));

            $this->info("Broadcasted: {$active} active users");
            return 0;
        } catch (\Throwable $e) {
            $this->error("Failed to broadcast analytics: {$e->getMessage()}");
            Log::error('Analytics broadcast failed', ['error' => $e->getMessage()]);
            return 1;
        }
    }
}
