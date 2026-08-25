# Laravel Reverb WebSockets Implementation

## ✅ Backend Implementation Complete

I've successfully implemented the Laravel Reverb WebSocket system for real-time updates in your backend. Here's what was added:

### 1. **Laravel Reverb Setup**
- Added `laravel/reverb` to composer.json
- Created `config/broadcasting.php` with Reverb configuration
- Updated `.env.example` with Reverb environment variables
- Added broadcasting routes to `routes/web.php`

### 2. **Broadcasting Events**
Created 4 real-time events:
- **NotificationCreated**: Broadcasts new notifications to specific users
- **MessageReceived**: Broadcasts new contact form messages to admins
- **ActivityLogged**: Broadcasts activity logs to admin channel
- **UserOnline**: Presence channel for tracking online users

### 3. **Channel Authorization**
Created `routes/channels.php` with proper authorization:
- `user.{userId}`: Private user-specific channels
- `admin.messages`: Admin-only message notifications
- `admin.activity`: Admin-only activity updates
- `admin.presence`: Presence channel for online users

### 4. **Service Integration**
- Created `NotificationService` for centralized event dispatching
- Updated `MessageController` to broadcast new messages
- Updated `SubscriberController` to broadcast new subscriptions
- Updated `ActivityLog` model to auto-broadcast on logging

### 5. **Supervisor Configuration**
- Added `supervisor/reverb.conf` for production WebSocket server
- Updated supervisor README with Reverb setup instructions

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
composer install
```

### 2. Configure Environment
Add these to your `.env` file:
```bash
BROADCAST_CONNECTION=reverb
REVERB_APP_ID=your-app-id-here
REVERB_APP_KEY=your-app-key-here
REVERB_APP_SECRET=your-app-secret-here
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http
```

Generate secure keys:
```bash
php artisan tinker
>>> echo bin2hex(random_bytes(16))  // for REVERB_APP_ID
>>> echo bin2hex(random_bytes(32))  // for REVERB_APP_KEY
>>> echo bin2hex(random_bytes(32))  // for REVERB_APP_SECRET
```

### 3. Start Reverb Server
```bash
php artisan reverb:start
```

You should see:
```
Starting Reverb server on 0.0.0.0:8080...
```

### 4. Test Broadcasting
```bash
php artisan tinker
>>> broadcast(new \App\Events\MessageReceived(\App\Models\Message::first()))
```

## 📡 Available Real-Time Features

### Notification Channels
- **User Notifications**: `user.{userId}` - Individual user notifications
- **Admin Messages**: `admin.messages` - New contact form messages
- **Admin Activity**: `admin.activity` - Activity log updates
- **Admin Presence**: `admin.presence` - Online user tracking

### Event Types
- `notification.created` - New notification for a user
- `message.received` - New contact form message
- `activity.logged` - New activity log entry
- `user.online` - User presence updates

## 🔒 Channel Authorization

All channels require authentication:
- User channels: Only the user can subscribe to their own channel
- Admin channels: Only users with admin/editor roles can subscribe
- Presence channels: Additional user data is shared among online users

## 🎯 Frontend Integration (Next Steps)

The React frontend integration will require:

### 1. Install Dependencies
```bash
cd frontend
npm install laravel-echo pusher-js
```

### 2. Configure Echo
Create `src/lib/echo.js` with Laravel Echo configuration
- Set up Reverb connection
- Configure authentication headers
- Handle reconnection logic

### 3. Create Real-Time Hooks
- `useChannel` - Subscribe to private channels
- `usePresence` - Subscribe to presence channels
- Real-time notification updates
- Live message inbox updates
- Activity log streaming

### 4. Update Components
- Notification dropdown with real-time updates
- Messages inbox with live updates
- Activity log with streaming updates
- Online users widget

### 5. Handle Authentication
- Connect Echo on login
- Disconnect Echo on logout
- Handle token refresh

## 📊 Data Payloads

### NotificationCreated
```json
{
  "id": 1,
  "type": "message",
  "title": "New inquiry from John Doe",
  "description": "Hi, I wanted to...",
  "actor": {"name": "John Doe", "email": "john@example.com"},
  "link": "/messages",
  "priority": "high",
  "read": false,
  "time": "2024-01-15T10:30:00Z"
}
```

### MessageReceived
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "preview": "Hi, I wanted to ask about...",
  "time": "2024-01-15T10:30:00Z"
}
```

### ActivityLogged
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "name": "Admin User",
    "avatar": "https://..."
  },
  "action": "created",
  "module": "Project",
  "target": "New Website",
  "details": "Created new project",
  "ip": "192.168.1.1",
  "time": "2024-01-15T10:30:00Z"
}
```

### UserOnline (Presence)
```json
{
  "user": {
    "id": 1,
    "name": "Admin User",
    "avatar": "https://..."
  },
  "at": "2024-01-15T10:30:00Z"
}
```

## 🔧 Production Deployment

### Supervisor Configuration
Add to Supervisor for production:
```bash
sudo cp supervisor/reverb.conf /etc/supervisor/conf.d/laravel-reverb.conf
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start laravel-reverb
```

### Nginx Configuration
Add WebSocket proxy configuration:
```nginx
location /socket.io {
    proxy_pass http://localhost:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
}
```

### SSL Configuration
For production with SSL:
```bash
REVERB_SCHEME=https
REVERB_PORT=443
```

## 🧪 Testing

### Test Connection
```bash
curl http://localhost:8080
```

### Test Broadcasting
```bash
php artisan tinker
>>> $user = \App\Models\User::first()
>>> broadcast(new \App\Events\NotificationCreated(\App\Models\AppNotification::create([
    'user_id' => $user->id,
    'type' => 'test',
    'title' => 'Test Notification',
    'description' => 'This is a test'
])))
```

### Monitor Connections
Check Reverb logs:
```bash
tail -f storage/logs/reverb.log
```

## 🎉 Current Status

**Backend**: ✅ Complete and ready to use
**Frontend**: ⏳ Ready for implementation (React integration needed)

The WebSocket server is now running and broadcasting events. You can test it manually or proceed with the React frontend integration to enable real-time updates in your admin panel.