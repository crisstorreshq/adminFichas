<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FichasController;
use App\Http\Controllers\FichaDigitalizadaController;
use App\Http\Controllers\AuthController;

Route::get('api/sin-permisos', function () {
    return view('errors.sin_permisos');
})->name('sinPermisos.index');

Route::post('api/logout', [AuthController::class, 'logout'])->name('logout');

Route::group(['middleware' => ['jwt.auth', 'check.group']], function ()
{
    Route::get('/', function () {
        return Inertia::render('Dashboard', [
            'auth' => Auth::user()
        ]);
    });
    
    Route::get('/vistaficha/{id}', [FichasController::class, 'verFicha']);
    Route::post('/asignar-ficha', [FichasController::class, 'asignarFicha']);
    Route::post('/digitalizar-ficha', [FichaDigitalizadaController::class, 'store']);
});