<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendEmailJob implements ShouldQueue
{
    use Queueable;

    public $tries = 3;
    public $maxExceptions = 3;
    public $timeout = 120;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Mailable $mailable,
        public string $to,
        public ?string $queueName = 'default'
    ) {
        $this->onQueue($queueName);
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Mail::to($this->to)->send($this->mailable);
        } catch (\Exception $e) {
            Log::error('Email sending failed: ' . $e->getMessage(), [
                'to' => $this->to,
                'exception' => $e,
            ]);

            throw $e; // Re-throw to trigger retry
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('Email job failed permanently: ' . $exception->getMessage(), [
            'to' => $this->to,
            'exception' => $exception,
        ]);
    }
}
