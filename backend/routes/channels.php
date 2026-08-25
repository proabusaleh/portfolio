<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user has access to the channel.
|
*/

/**
 * User's private channel — only they can subscribe
 */
Broadcast::channel('user.{userId}', function (User $user, int $userId) {
    return (int) $user->id === $userId;
});

/**
 * Admin-only channels
 */
Broadcast::channel('admin.messages', function (User $user) {
    return $user->hasRole('admin') || $user->hasRole('editor');
});

Broadcast::channel('admin.activity', function (User $user) {
    return $user->hasRole('admin');
});

/**
 * Presence channel — see who's online
 * Return array to be included in "here" data
 */
Broadcast::channel('admin.presence', function (User $user) {
    if (!$user->hasAnyRole(['admin', 'editor'])) return false;

    return [
        'id'        => $user->id,
        'name'      => $user->name,
        'avatar'    => $user->avatar,
        'role'      => $user->getRoleNames()->first(),
        'online_at' => now()->toIso8601String(),
    ];
});

/**
 * Analytics real-time channel for admins
 */
Broadcast::channel('admin.analytics', function (User $user) {
    return $user->hasRole('admin');
});