#!/bin/bash

# Laravel Cron Job Setup
# Add this to your crontab: crontab -e

# Laravel Scheduler
# Runs every minute to handle scheduled tasks including campaign sending
* * * * * cd {{PROJECT_PATH}} && php artisan schedule:run >> /dev/null 2>&1

# Alternative with logging:
# * * * * * cd {{PROJECT_PATH}} && php artisan schedule:run >> {{PROJECT_PATH}}/storage/logs/cron.log 2>&1

# To install:
# 1. Replace {{PROJECT_PATH}} with your actual project path
# 2. Run: crontab -e
# 3. Add the line above
# 4. Save and exit

# To verify it's working:
# tail -f {{PROJECT_PATH}}/storage/logs/cron.log