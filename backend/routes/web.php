<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;

Route::get('/', function () {
    return view('welcome');
});

// Broadcasting authentication route for WebSocket channels
Broadcast::routes(['middleware' => ['auth:sanctum']]);
