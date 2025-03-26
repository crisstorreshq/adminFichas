<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FichasController;
use App\Http\Controllers\FichaDigitalizadaController;

Route::group(['middleware' => ['jwt.auth', 'check.group']], function ()
{
    Route::get("/getAuth", function(){
        return Auth::user();
    });
});