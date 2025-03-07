<?php

namespace App\Http\Middleware;

use Closure;

class NgrokSkipBrowserWarning
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        return $response->header('ngrok-skip-browser-warning', 'true');
    }
}