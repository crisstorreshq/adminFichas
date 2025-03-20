<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    private function cleanRUT($rut)
    {
        $rut = str_replace(['.', '-'], '', $rut);
        $cuerpo = substr($rut, 0, -1);
        $dv = substr($rut, -1);
        return $cuerpo . '-' . strtoupper($dv);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $cookie = cookie('auth_token', null, -1);
        return response()->json(['message' => 'Logged out successfully'], 200)->withCookie($cookie);
    }
}
