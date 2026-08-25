<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\BlogCommentController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\SubscriberController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\EmailTrackingController;
use App\Http\Controllers\EmailWebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/* Public */
Route::post('/login',           [AuthController::class, 'login'])->name('login');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-otp',      [AuthController::class, 'verifyOtp']);
Route::post('/reset-password',  [AuthController::class, 'resetPassword']);

/* Email Tracking (Public) */
Route::get('/track/open/{trackingId}', [EmailTrackingController::class, 'trackOpen']);
Route::get('/track/click/{trackingId}', [EmailTrackingController::class, 'trackClick']);
Route::get('/unsubscribe/{token}', [EmailTrackingController::class, 'unsubscribe']);

/* Email Webhooks (Public - for email providers) */
Route::post('/webhooks/ses/bounce', [EmailWebhookController::class, 'handleSesBounce']);
Route::post('/webhooks/ses/complaint', [EmailWebhookController::class, 'handleSesComplaint']);
Route::post('/webhooks/ses/delivery', [EmailWebhookController::class, 'handleSesDelivery']);
Route::post('/webhooks/generic', [EmailWebhookController::class, 'handleGenericWebhook']);

/* Protected */
Route::middleware('auth:sanctum')->group(function () {

    /* Auth */
    Route::get('/me',      [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    /* Profile */
    Route::put('/profile',          [ProfileController::class, 'update']);
    Route::post('/profile/password', [ProfileController::class, 'changePassword']);

    /* Dashboard */
    Route::get('/dashboard', [DashboardController::class, 'overview']);

    /* Projects */
    Route::apiResource('projects', ProjectController::class);
    Route::post('projects/{id}/duplicate', [ProjectController::class, 'duplicate']);
    Route::post('projects/bulk',           [ProjectController::class, 'bulkUpdate']);
    Route::delete('projects',              [ProjectController::class, 'destroy']);

    /* Blog */
    Route::apiResource('blog-posts',    BlogPostController::class);
    Route::apiResource('blog-comments', BlogCommentController::class)->only(['index', 'update', 'destroy']);

    /* Services */
    Route::apiResource('services', ServiceController::class);
    Route::post('services/reorder', [ServiceController::class, 'reorder']);

    /* Skills */
    Route::apiResource('skills', SkillController::class);
    Route::post('skills/reorder', [SkillController::class, 'reorder']);

    /* Testimonials */
    Route::apiResource('testimonials', TestimonialController::class);

    /* Messages */
    Route::apiResource('messages', MessageController::class);
    Route::post('messages/{id}/star',      [MessageController::class, 'toggleStar']);
    Route::post('messages/{id}/move',      [MessageController::class, 'move']);
    Route::post('messages/{id}/mark-read', [MessageController::class, 'markRead']);
    Route::post('messages/{id}/reply',     [MessageController::class, 'reply']);

    /* Newsletter */
    Route::apiResource('subscribers', SubscriberController::class);
    Route::apiResource('campaigns',   CampaignController::class);
    Route::post('campaigns/{id}/send', [CampaignController::class, 'send']);
    Route::post('campaigns/{id}/test', [CampaignController::class, 'sendTest']);

    /* Media */
    Route::get('media',                 [MediaController::class, 'index']);
    Route::post('media/upload',         [MediaController::class, 'upload']);
    Route::delete('media',              [MediaController::class, 'destroy']);
    Route::post('media/move',           [MediaController::class, 'move']);
    Route::get('media/folders',         [MediaController::class, 'folders']);
    Route::post('media/folders',        [MediaController::class, 'createFolder']);
    Route::delete('media/folders/{id}', [MediaController::class, 'deleteFolder']);
    Route::get('media/storage',         [MediaController::class, 'storage']);
    Route::get('media/folder-counts',   [MediaController::class, 'folderCounts']);

    /* Settings */
    Route::get('settings',         [SettingController::class, 'index']);
    Route::post('settings',        [SettingController::class, 'save']);
    Route::get('settings/{key}',   [SettingController::class, 'show']);

    /* Email Testing */
    Route::middleware('throttle.email')->group(function () {
        Route::post('email/test', function (Request $request) {
            $request->validate(['email' => 'required|email']);
            $emailService = new \App\Services\EmailService();
            $success = $emailService->sendTestEmail($request->email);
            return response()->json(['success' => $success]);
        });
    });

    /* Users (admin only) */
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::post('users/{id}/status', [UserController::class, 'updateStatus']);
    });

    /* Activity Log */
    Route::get('activity',           [ActivityLogController::class, 'index']);
    Route::get('activity/stats',     [ActivityLogController::class, 'stats']);
    Route::get('activity/heatmap',   [ActivityLogController::class, 'heatmap']);
    Route::get('activity/breakdown', [ActivityLogController::class, 'breakdown']);

    /* Notifications */
    Route::get('notifications',              [NotificationController::class, 'index']);
    Route::get('notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::post('notifications/{id}/read',   [NotificationController::class, 'markRead']);
    Route::post('notifications/read-all',    [NotificationController::class, 'markAllRead']);
    Route::delete('notifications/{id}',      [NotificationController::class, 'destroy']);
    Route::delete('notifications',           [NotificationController::class, 'clearAll']);

    /* Analytics */
    Route::get('analytics',           [AnalyticsController::class, 'overview']);
    Route::get('analytics/realtime',  [AnalyticsController::class, 'realtime']);
});
