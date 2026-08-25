<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RealtimeVisitors implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public int $activeUsers) {}

    public function broadcastOn(): array
    {
        return [new PrivateChannel('admin.analytics')];
    }

    public function broadcastAs(): string
    {
        return 'analytics.realtime';
    }

    public function broadcastWith(): array
    {
        return [
            'activeUsers' => $this->activeUsers,
            'timestamp'   => now()->toIso8601String(),
        ];
    }
}
