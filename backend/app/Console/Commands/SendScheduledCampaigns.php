<?php

namespace App\Console\Commands;

use App\Models\Campaign;
use App\Services\EmailService;
use Illuminate\Console\Command;

class SendScheduledCampaigns extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'campaigns:send-scheduled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send campaigns that are scheduled and due';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $campaigns = Campaign::where('status', 'scheduled')
            ->where('scheduled_at', '<=', now())
            ->get();

        if ($campaigns->isEmpty()) {
            $this->info('No scheduled campaigns to send.');
            return 0;
        }

        $emailService = new EmailService();

        foreach ($campaigns as $campaign) {
            $this->info("Sending campaign: {$campaign->subject}");

            try {
                $recipientCount = $emailService->sendCampaignToSubscribers($campaign);

                $campaign->update([
                    'status' => 'sent',
                    'sent_at' => now(),
                ]);

                $this->info("✓ Campaign sent to {$recipientCount} subscribers");
            } catch (\Exception $e) {
                $this->error("✗ Failed to send campaign: {$e->getMessage()}");
            }
        }

        $this->info("Completed sending {$campaigns->count()} scheduled campaigns.");
        return 0;
    }
}
