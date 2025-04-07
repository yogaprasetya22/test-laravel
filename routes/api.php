<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/db-check', function () {
    try {
        DB::connection()->getPdo();
        return "✔️ Koneksi database berhasil: " . DB::connection()->getDatabaseName();
    } catch (\Exception $e) {
        return "❌ Gagal konek DB: " . $e->getMessage();
    }
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::patch('/users/{uuid}', [UserController::class, 'update']);
Route::delete('/users/{uuid}', [UserController::class, 'destroy']);
