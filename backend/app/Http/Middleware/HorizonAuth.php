<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class HorizonAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only allow authenticated admin users
        if (!Auth::check() || !Auth::user()?->hasRole('admin')) {
            abort(403, 'Unauthorized access to Horizon');
        }

        return $next($request);
    }
}
