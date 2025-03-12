<?php

use App\Http\Controllers\FichasController;
use App\Http\Controllers\FichaDigitalizadaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__.'/auth.php';

Route::get('/', function () {
    return Inertia::render('Dashboard');
})
->middleware(['auth']);

Route::get('/vistaficha/{id}', [FichasController::class, 'verFicha'])->middleware(['auth']);
Route::post('/asignar-ficha', [FichasController::class, 'asignarFicha']);
Route::post('/digitalizar-ficha', [FichaDigitalizadaController::class, 'store']);