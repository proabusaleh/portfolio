<?php

namespace App\Services;

use App\Events\NotificationCreated;
use App\Models\AppNotification;

class NotificationService
{
    /**
     * Create + broadcast notification in one call
     */
    public static function create(array $data): AppNotification
    {
        $notification = AppNotification::create($data);

        // Broadcast in real-time
        broadcast(new NotificationCreated($notification))->toOthers();

        return $notification;
    }

    /**
     * Notify a specific user
     */
    public static function notify(int $userId, string $type, string $title, array $extra = []): AppNotification
    {
        return static::create(array_merge([
            'user_id'     => $userId,
            'type'        => $type,
            'title'       => $title,
            'priority'    => 'normal',
        ], $extra));
    }

    /**
     * Broadcast to all admins
     */
    public static function notifyAdmins(string $type, string $title, array $extra = []): void
    {
        \App\Models\User::role('admin')->each(function ($user) use ($type, $title, $extra) {
            static::notify($user->id, $type, $title, $extra);
        });
    }
}