<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Horizon Domain
    |--------------------------------------------------------------------------
    |
    | This is the subdomain where Horizon will be accessible from. If this
    | setting is null, Horizon will reside under the same domain as the
    | application. Otherwise, Horizon's traffic will be routed through
    | the subdomain specified here.
    |
    */

    'domain' => env('HORIZON_DOMAIN', null),

    /*
    |--------------------------------------------------------------------------
    | Horizon Path
    |--------------------------------------------------------------------------
    |
    | This is the URI path where Horizon will be accessible from. Feel free
    | to change this path to anything you like. Note that the URI will not
    | affect the path of Horizon's internal API that isn't exposed to users.
    |
    */

    'path' => env('HORIZON_PATH', 'horizon'),

    /*
    |--------------------------------------------------------------------------
    | Horizon Storage Driver
    |--------------------------------------------------------------------------
    |
    | This configuration options determines the storage driver that will
    | be used to store Horizon's keys and data. You may change this
    | value to any of the connections defined in your queue config.
    |
    */

    'use' => env('HORIZON_DRIVER', 'redis'),

    /*
    |--------------------------------------------------------------------------
    | Horizon Redis Prefix
    |--------------------------------------------------------------------------
    |
    | This prefix will be used when storing all Horizon data in Redis.
    |
    */

    'prefix' => env('HORIZON_PREFIX', 'horizon_'),

    /*
    |--------------------------------------------------------------------------
    | Horizon Middleware
    |--------------------------------------------------------------------------
    |
    | These middleware will get attached onto each Horizon route, giving you
    | the chance to add your own middleware to this list or change any of
    | the existing middleware. Or, you can simply stick with this list.
    |
    */

    'middleware' => ['web', 'auth', 'horizon.auth'],

    /*
    |--------------------------------------------------------------------------
    | Queue Wait Time Thresholds
    |--------------------------------------------------------------------------
    |
    | Each queue has a "wait time" threshold which determines the maximum
    | number of seconds a job should wait before being counted as a failed
    | job. This value may be configured per queue to finely tune your
    | application's queue wait time thresholds.
    |
    */

    'waits' => [
        'redis:default' => 60,
        'redis:high,custom' => 60,
    ],

    /*
    |--------------------------------------------------------------------------
    | Job Trimming Times
    |--------------------------------------------------------------------------
    |
    | Horizon will trim the stored job history after a certain amount of
    | time has passed. You may configure the number of minutes that you
    | would like to retain the job history for each queue below.
    |
    */

    'trim' => [
        'recent' => 60,
        'failed' => 10080,
        'monitored' => 10080,
    ],

    /*
    |--------------------------------------------------------------------------
    | Metrics
    |--------------------------------------------------------------------------
    |
    | Here you may configure how long (in minutes) the metrics are stored.
    | You may also configure the "slim" option to trim more aggressively.
    |
    */

    'metrics' => [
        'trim_slugs' => [
            'recent' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Fast Termination
    |--------------------------------------------------------------------------
    |
    | When this option is enabled, Horizon will exit with a success status
    | code even if some workers were not able to terminate gracefully. This
    | is useful when Horizon is running within a Docker container or when
    | the OS signal handling is not reliable.
    |
    */

    'fast_termination' => false,

    /*
    |--------------------------------------------------------------------------
    | Memory Limit (MB)
    |--------------------------------------------------------------------------
    |
    | This value determines the maximum amount of memory a worker may consume
    | before it is terminated and restarted. You may set this to zero to disable
    | the memory limit entirely.
    |
    */

    'memory_limit' => env('HORIZON_MEMORY', 128),

    /*
    |--------------------------------------------------------------------------
    | Worker Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may define the worker configuration for your queues. These
    | options may be used to fine-tune the behavior of your workers or
    | to customize the worker pool size for each environment.
    |
    */

    'environments' => [
        'production' => [
            'supervisor-1' => [
                'connection' => 'redis',
                'queue' => ['default', 'high'],
                'balance' => 'simple',
                'processes' => 3,
                'tries' => 3,
                'timeout' => 300,
            ],
        ],

        'local' => [
            'supervisor-1' => [
                'connection' => 'redis',
                'queue' => ['default', 'high'],
                'balance' => 'simple',
                'processes' => 3,
                'tries' => 3,
                'timeout' => 300,
            ],
        ],
    ],
];