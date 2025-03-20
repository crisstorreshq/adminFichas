<?php

use App\Http\Controllers\FichasController;
use App\Http\Controllers\FichaDigitalizadaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\UsuarioJWT;

use App\Http\Controllers\AuthController;


Route::get('api/sin-permisos', function () {
    return view('errors.sin_permisos');
})->name('sinPermisos.index');

Route::post('api/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['jwt.auth', 'check.group']);

Route::get('/vistaficha/{id}', [FichasController::class, 'verFicha'])->middleware(['jwt.auth', 'check.group']);
Route::post('/asignar-ficha', [FichasController::class, 'asignarFicha'])->middleware(['jwt.auth', 'check.group']);
Route::post('/digitalizar-ficha', [FichaDigitalizadaController::class, 'store'])->middleware(['jwt.auth', 'check.group']);