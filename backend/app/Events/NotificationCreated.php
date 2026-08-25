<?php

namespace App\Events;

use App\Models\AppNotification;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotificationCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public AppNotification $notification) {}

    /**
     * Broadcast on private user-specific channel
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('user.' . $this->notification->user_id),
        ];
    }

    /**
     * Custom event name (frontend listens for this)
     */
    public function broadcastAs(): string
    {
        return 'notification.created';
    }

    /**
     * Data payload sent to clients
     */
    public function broadcastWith(): array
    {
        return [
            'id'          => $this->notification->id,
            'type'        => $this->notification->type,
            'title'       => $this->notification->title,
            'description' => $this->notification->description,
            'actor'       => $this->notification->actor,
            'link'        => $this->notification->link,
            'priority'    => $this->notification->priority,
            'read'        => $this->notification->read,
            'time'        => $this->notification->created_at?->toIso8601String(),
        ];
    }
}
