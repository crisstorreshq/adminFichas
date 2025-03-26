<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Auth;

class CheckGrupoUsuario
{
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return redirect()
            ->route('sinPermisos.index')
            ->with('noAccessMessage', 'Usted no tiene acceso a este sistema.');
        }

        try {
            JWTAuth::setToken($token);
            $user = JWTAuth::authenticate();
            \Illuminate\Support\Facades\Auth::setUser($user);
        } catch (\Exception $e) {
            return redirect()
            ->route('sinPermisos.index')
            ->with('noAccessMessage', 'Usted no tiene acceso a este sistema.');
        }

        $apiLoginUrl = \Config::get('services.api_login.url');
        $endpoint = rtrim($apiLoginUrl, '/') . '/api/usuario/grupos';

        try {
            $response = \Http::withToken($token)->get($endpoint);

            if (!$response->successful()) {
                return response()->json(['error' => 'No se pudo obtener los grupos', 'details' => $response->body()], 500);
            }

            $data = $response->json();
            if (($data['status'] ?? null) !== 'success') {
                return response()->json(['error' => 'Error en respuesta de ApiLogin', 'details' => $data], 500);
            }

            $gruposDelUsuario = $data['grupos'] ?? [];
            $sistemaName = env('NOMBRE_SISTEMA', 'AdminFichas');
            $nombresGrupos = collect($gruposDelUsuario)->pluck('NombreGrupo');

            if (!$nombresGrupos->contains($sistemaName)) {
                return redirect()
                ->route('sinPermisos.index')
                ->with('noAccessMessage', 'Usted no tiene acceso a este sistema.');
            }

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error consultando ApiLogin', 'message' => $e->getMessage()], 500);
        }

        return $next($request);
    }
}
