<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ValidateUserInput
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Hanya validasi jika rute terkait user dan metode POST, PUT, PATCH
        if (
            str_contains($request->path(), 'users') &&
            in_array($request->method(), ['POST', 'PUT', 'PATCH'])
        ) {

            $rules = [];

            // Aturan validasi berdasarkan metode request
            if ($request->isMethod('POST')) {
                $rules = [
                    'name' => 'required|string|max:255',
                    'email' => 'required|string|email|max:255|unique:users',
                    'age' => 'required|integer|min:0',
                ];
            } else if ($request->isMethod('PUT') || $request->isMethod('PATCH')) {
                $rules = [
                    'name' => 'sometimes|string|max:255',
                    'email' => 'sometimes|string|email|max:255|unique:users',
                    'age' => 'sometimes|integer|min:0',
                ];
            }

            // Jalankan validasi
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
        }

        return $next($request);
    }
}
