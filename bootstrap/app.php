<?php

use App\Http\Middleware\LogRequest;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        api: __DIR__ . '/../routes/api.php',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Mendaftarkan middleware global
        $middleware->append(LogRequest::class);

        // Untuk grup API
        $middleware->api(append: [
            LogRequest::class,
        ]);

        // Mendaftarkan alias untuk digunakan di route
        $middleware->alias([
            'log.request' => LogRequest::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
