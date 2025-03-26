<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FichasController;
use App\Http\Controllers\FichaDigitalizadaController;

Route::group(['middleware' => ['jwt.auth', 'check.group']], function ()
{
    Route::post('/agregar-pdf-ficha', [FichaDigitalizadaController::class, 'agregarPdfAFicha']);
    Route::post('/digitalizar-ficha', [FichaDigitalizadaController::class, 'store']);
    Route::get('/listadoDeFichas', [FichasController::class, 'listFiles']);
    Route::get('/pacientes', [FichasController::class, 'listPacientes']);
});