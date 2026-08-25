# Production Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. Email Provider Setup

#### Amazon SES (Recommended)
- [ ] Create AWS account and verify SES domain
- [ ] Set up SPF, DKIM, and DMARC records
- [ ] Configure SES webhooks for bounce/complaint handling
- [ ] Move out of SES sandbox (request production access)
- [ ] Warm up sending IP (start with low volume)

#### Alternative Providers
- [ ] Resend: Configure API key and verify domain
- [ ] SendGrid: Configure API key and set up webhooks
- [ ] Mailgun: Configure domain and webhook settings

### 2. Server Requirements

#### Minimum Requirements
- PHP 8.2+
- MySQL 5.7+ or PostgreSQL 12+
- Redis 6.0+
- Nginx or Apache
- SSL certificate (Let's Encrypt recommended)

#### PHP Extensions
```bash
php-bcmath, php-ctype, php-curl, php-dom, php-fileinfo, php-gd,
php-json, php-mbstring, php-mysql, php-openssl, php-pcntl,
php-pdo, php-tokenizer, php-xml, php-redis
```

### 3. Infrastructure Setup

#### Redis Installation
```bash
sudo apt-get install redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

#### Supervisor Installation
```bash
sudo apt-get install supervisor
```

#### Composer Dependencies
```bash
composer install --optimize-autoloader --no-dev
```

## 📋 Deployment Steps

### 1. Environment Configuration

```bash
# Copy production environment template
cp env.production.example .env

# Generate application key
php artisan key:generate

# Update configuration values
nano .env
```

**Critical Values to Update:**
- `APP_URL` - Your production domain
- `APP_ENV` - Set to `production`
- `APP_DEBUG` - Set to `false`
- `DB_*` - Database credentials
- `REDIS_*` - Redis configuration
- `MAIL_*` - Email provider settings
- `AWS_*` - AWS SES credentials (if using SES)

### 2. Database Setup

```bash
# Run migrations
php artisan migrate --force

# Seed database (if needed)
php artisan db:seed --force
```

### 3. Queue Configuration

```bash
# Create queue tables (if not already created)
php artisan queue:table
php artisan queue:failed-table
php artisan migrate --force
```

### 4. Supervisor Setup

```bash
# Update supervisor config files
sed -i 's|{{PROJECT_PATH}}|/var/www/html/backend|g' supervisor/*.conf
sed -i 's|{{USER}}|www-data|g' supervisor/*.conf

# Copy to supervisor config directory
sudo cp supervisor/queue-worker.conf /etc/supervisor/conf.d/
sudo cp supervisor/queue-worker-high.conf /etc/supervisor/conf.d/
sudo cp supervisor/horizon.conf /etc/supervisor/conf.d/

# Start supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start all
```

### 5. Cron Job Setup

```bash
# Edit crontab
crontab -e

# Add Laravel scheduler
* * * * * cd /var/www/html/backend && php artisan schedule:run >> /dev/null 2>&1
```

### 6. Application Optimization

```bash
# Clear and cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Optimize composer autoloader
composer dump-autoload --optimize

# Cache events and routes
php artisan event:cache
```

### 7. Permissions

```bash
# Set proper permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### 8. Web Server Configuration

#### Nginx Example
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    root /var/www/html/backend/public;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## 🔐 Security Hardening

### 1. SSL/TLS Configuration
- [ ] Install SSL certificate (Let's Encrypt recommended)
- [ ] Enable HTTP/2
- [ ] Configure security headers
- [ ] Set up HSTS

### 2. Email Security Records
Add these DNS records to your domain:

#### SPF Record
```
yourdomain.com.  IN  TXT  "v=spf1 include:amazonses.com ~all"
```

#### DKIM (for SES)
- Generate DKIM keys in AWS SES console
- Add CNAME records as provided by AWS

#### DMARC Record
```
_dmarc.yourdomain.com.  IN  TXT  "v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com"
```

### 3. Application Security
```bash
# Install security updates regularly
sudo apt-get update && sudo apt-get upgrade

# Configure firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 📊 Monitoring & Maintenance

### 1. Laravel Horizon
- Access at `https://yourdomain.com/horizon`
- Monitor queue performance
- Track failed jobs
- View worker metrics

### 2. Email Monitoring
- Check email logs in database
- Monitor bounce/complaint rates
- Track open/click rates via webhooks

### 3. Regular Maintenance
```bash
# Clear expired job batches
php artisan queue:prune-batches --hours=48

# Clear failed jobs (after reviewing)
php artisan queue:flush

# Clear application cache
php artisan cache:clear

# Rotate logs
php artisan log:rotate
```

## 🔄 IP Warm-up Process

For new SES accounts, follow this warm-up schedule:

**Week 1:**
- Day 1-2: 50 emails/day
- Day 3-4: 100 emails/day
- Day 5-7: 200 emails/day

**Week 2:**
- Day 8-10: 500 emails/day
- Day 11-14: 1,000 emails/day

**Week 3+:**
- Gradually increase to your target volume
- Monitor bounce/complaint rates (<1% bounces, <0.1% complaints)

## 🚨 Troubleshooting

### Queue Workers Not Starting
```bash
# Check supervisor status
sudo supervisorctl status

# View worker logs
sudo tail -f storage/logs/queue-worker.log

# Restart workers
sudo supervisorctl restart all
```

### Horizon Not Working
```bash
# Ensure Redis is running
sudo systemctl status redis-server

# Check Horizon logs
sudo tail -f storage/logs/horizon.log

# Restart Horizon
sudo supervisorctl restart laravel-horizon
```

### Email Sending Issues
```bash
# Check email logs
php artisan tinker
>>> App\Models\EmailLog::latest()->get()

# Test queue connection
php artisan queue:work --once

# Check Horizon for failed jobs
# Visit /horizon and check failed jobs section
```

## 📞 Emergency Contacts

- AWS SES Support: Available through AWS Console
- Email Provider Support: Check provider documentation
- Application Logs: `storage/logs/laravel.log`

## 🎯 Post-Deployment Checklist

- [ ] Test email sending with production credentials
- [ ] Verify webhooks are receiving events
- [ ] Test password reset flow
- [ ] Verify newsletter subscription flow
- [ ] Test campaign sending
- [ ] Check Horizon dashboard is accessible
- [ ] Monitor first few email deliveries
- [ ] Set up uptime monitoring
- [ ] Configure backup strategy
- [ ] Document recovery procedures