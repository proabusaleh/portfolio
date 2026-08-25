<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class RateLimitEmailSending
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $key = 'email_sending:' . $request->ip();

        // Rate limit: 100 emails per minute per IP
        $executed = RateLimiter::attempt(
            $key,
            100, // max attempts
            function() {}, // callback
            60 // decay seconds
        );

        if (!$executed) {
            $seconds = RateLimiter::availableIn($key);
            return response()->json([
                'message' => 'Too many email requests. Please try again in ' . $seconds . ' seconds.',
                'retry_after' => $seconds
            ], 429);
        }

        return $next($request);
    }
}
