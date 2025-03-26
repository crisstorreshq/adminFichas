<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdquisicionController;
use App\Http\Controllers\InsumoController;
use App\Http\Controllers\DespachoController;
use App\Http\Controllers\DespachoItemController;
use App\Http\Controllers\AuthController;

Route::get('api/sin-permisos', function () {
    return view('errors.sin_permisos');
})->name('sinPermisos.index');

Route::post('api/logout', [AuthController::class, 'logout'])->name('logout');

Route::group(['middleware' => ['web.jwt']], function ()
{
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    });
    Route::resource('adquisiciones', AdquisicionController::class);
    Route::resource('insumos', InsumoController::class);
    Route::resource('despachos', DespachoController::class);
    Route::resource('despacho-items', DespachoItemController::class);
});