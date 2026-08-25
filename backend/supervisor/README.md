# Supervisor Configuration for Laravel Queue Workers

## Installation

1. Install Supervisor:
```bash
sudo apt-get install supervisor
# or
sudo yum install supervisor
```

2. Copy and customize configuration files:
```bash
# Replace placeholders with your actual deployment path and user
sed -i 's|{{PROJECT_PATH}}|/var/www/html/backend|g' supervisor/queue-worker.conf
sed -i 's|{{USER}}|www-data|g' supervisor/queue-worker.conf

sed -i 's|{{PROJECT_PATH}}|/var/www/html/backend|g' supervisor/queue-worker-high.conf
sed -i 's|{{USER}}|www-data|g' supervisor/queue-worker-high.conf

sed -i 's|{{PROJECT_PATH}}|/var/www/html/backend|g' supervisor/horizon.conf
sed -i 's|{{USER}}|www-data|g' supervisor/horizon.conf

sed -i 's|{{PROJECT_PATH}}|/var/www/html/backend|g' supervisor/reverb.conf
sed -i 's|{{USER}}|www-data|g' supervisor/reverb.conf

sudo cp supervisor/queue-worker.conf /etc/supervisor/conf.d/laravel-queue-worker.conf
sudo cp supervisor/queue-worker-high.conf /etc/supervisor/conf.d/laravel-queue-worker-high.conf
sudo cp supervisor/horizon.conf /etc/supervisor/conf.d/laravel-horizon.conf
sudo cp supervisor/reverb.conf /etc/supervisor/conf.d/laravel-reverb.conf
```

4. Start Supervisor:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start laravel-queue-worker:*
sudo supervisorctl start laravel-queue-worker-high:*
sudo supervisorctl start laravel-horizon
sudo supervisorctl start laravel-reverb
```

## Management Commands

```bash
# Check status
sudo supervisorctl status

# Restart workers
sudo supervisorctl restart laravel-queue-worker:*
sudo supervisorctl restart laravel-horizon

# Stop workers
sudo supervisorctl stop laravel-queue-worker:*

# View logs
sudo tail -f /var/www/html/backend/storage/logs/queue-worker.log
sudo tail -f /var/www/html/backend/storage/logs/horizon.log
```

## Configuration Details

- **queue-worker.conf**: Standard queue worker with 2 processes
- **queue-worker-high.conf**: High-priority queue worker for time-sensitive emails
- **horizon.conf**: Laravel Horizon for queue monitoring and management
- **reverb.conf**: Laravel Reverb WebSocket server for real-time features
- **--tries=3**: Retry failed jobs 3 times
- **--max-time=3600**: Restart workers after 1 hour to prevent memory leaks
- **--sleep=3**: Wait 3 seconds between jobs (standard), 1 second (high priority)

## Laravel Horizon

Horizon provides a beautiful dashboard and code-driven configuration for your Redis powered queues. Access it at `/horizon` in your application.

**Note**: Horizon requires Redis. Update your `.env` file:
```bash
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

## Laravel Reverb

Reverb is Laravel's first-party WebSocket server for real-time event broadcasting. It handles WebSocket connections and broadcasts events to connected clients.

**To start Reverb manually:**
```bash
php artisan reverb:start
```

**To verify Reverb is running:**
```bash
curl http://localhost:8080
```

**Note**: Reverb requires the broadcasting configuration in `.env`:
```bash
BROADCAST_CONNECTION=reverb
REVERB_APP_ID=your-app-id-here
REVERB_APP_KEY=your-app-key-here
REVERB_APP_SECRET=your-app-secret-here
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http
```