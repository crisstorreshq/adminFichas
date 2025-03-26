<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Renderizar una excepción en una respuesta HTTP.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        // OPCIONAL: Capturar cualquier HttpException con código 401 (no solo AuthenticationException).
        if ($this->isHttpException($exception) && $exception->getStatusCode() === 401) {
            // Si la petición espera JSON, podrías regresar un JSON 401:
            if ($request->expectsJson()) {
                return response()->json(['error' => 'No autenticado (401)'], 401);
            }
        // Si deseas mostrar tu propia vista de error 401
            // (crea "resources/views/errors/401.blade.php")
            return response()->view('errors.sin_permisos', [], 401);
        }

        // Dejar que el resto de excepciones se manejen de forma normal
        return parent::render($request, $exception);
    }

    /**
     * Manejar la excepción de no autenticado.
     * Laravel invoca este método cuando se lanza AuthenticationException
     * (por ejemplo, si el middleware 'auth' falla).
     *
     * @param  \Illuminate\Http\Request              $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        // Si es una petición tipo AJAX o API (expectsJson()), devolvemos JSON con status 401
        if ($request->expectsJson()) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        // Si NO es una petición AJAX/JSON, podemos:
        // 1) Redirigir al login de otra aplicación (APILOGIN_URL) 
        //    O
        // 2) Mostrar tu vista de error 401

        // -- OPCIÓN 1: Redirigir a ruta de login (por ejemplo, variable de entorno "APILOGIN_URL")
        return redirect(env('APILOGIN_URL', 'http://localhost:8000') . '/auth/login');

        // -- OPCIÓN 2: Mostrar tu vista 401 (descomenta si prefieres esto en lugar de redirigir)
        // return response()->view('errors.401', [], 401);
    }
}