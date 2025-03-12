<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FichasController;
use App\Http\Controllers\FichaDigitalizadaController;

Route::post('/agregar-pdf-ficha', [FichaDigitalizadaController::class, 'agregarPdfAFicha']);

Route::post('/digitalizar-ficha', [FichaDigitalizadaController::class, 'store']);

// Listado de fichas en el FTP
Route::get('/listadoDeFichas', [FichasController::class, 'listFiles']);

// Listado de pacientes con paginación y búsqueda
Route::get('/pacientes', [FichasController::class, 'listPacientes']);