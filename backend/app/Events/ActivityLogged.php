<?php

namespace App\Events;

use App\Models\ActivityLog;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ActivityLogged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public ActivityLog $log) {}

    public function broadcastOn(): array
    {
        return [new PrivateChannel('admin.activity')];
    }

    public function broadcastAs(): string
    {
        return 'activity.logged';
    }

    public function broadcastWith(): array
    {
        $user = $this->log->user;
        return [
            'id'      => $this->log->id,
            'user'    => $user ? [
                'id'     => $user->id,
                'name'   => $user->name,
                'avatar' => $user->avatar,
            ] : ['name' => 'System', 'isSystem' => true],
            'action'  => $this->log->action,
            'module'  => $this->log->module,
            'target'  => $this->log->target,
            'details' => $this->log->details,
            'ip'      => $this->log->ip,
            'time'    => $this->log->created_at?->toIso8601String(),
        ];
    }
}
