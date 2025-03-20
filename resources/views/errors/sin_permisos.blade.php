<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Acceso Denegado</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Estilos básicos para emular un diseño similar a Tailwind, sin usar Tailwind -->
    <style>
        /* ------------------ RESETEO BÁSICO ------------------ */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            display: flex;
            align-items: center;     /* Centra verticalmente */
            justify-content: center; /* Centra horizontalmente */
            height: 100vh;           /* Ocupa toda la altura de la ventana */
            background-color: #f3f3f3;
            font-family: Arial, sans-serif;
        }

        /* ------------------ CONTENEDOR PRINCIPAL ------------------ */
        .container {
            max-width: 28rem; /* ~ max-w-md (28rem = 448px) */
            width: 100%;      /* Que sea responsive */
            background-color: #ffffff;
            padding: 1.5rem; /* p-6 => 1.5rem = 24px */
            border-radius: 0.375rem; /* rounded => 6px aprox */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* ~ shadow-md */
        }

        /* ------------------ TÍTULO ------------------ */
        .title {
            font-size: 1.5rem;  /* ~ text-2xl */
            font-weight: 700;   /* ~ font-bold */
            color: #e53e3e;     /* ~ text-red-600 */
            margin-bottom: 1rem; /* ~ mb-4 */
            text-align: center; /* Centrado horizontal */
        }

        /* ------------------ MENSAJES ------------------ */
        .flash-message {
            color: #e53e3e;      /* ~ text-red-600 */
            margin-bottom: 1rem; 
            text-align: center;
        }
        .info-text {
            color: #4a5568;      /* ~ text-gray-700 */
            margin-top: 1rem;    /* ~ mt-4 */
            line-height: 1.5;
            text-align: center;
        }

        .btn {
            display: inline-block;
            margin-top: 1.5rem; /* Espacio extra sobre el botón */
            padding: 0.5rem 1rem; /* px-4 py-2 */
            background-color: #3182ce; /* ~ bg-blue-600 */
            color: #ffffff;
            text-decoration: none;
            border-radius: 0.375rem; /* ~ rounded => 6px */
            transition: background-color 0.2s ease-in-out;
            font-weight: 600;
            text-align: center;
        }
        .btn:hover {
            background-color: #2c5282; /* ~ hover:bg-blue-700 */
        }

        /* ------------------ MEDIA QUERIES (OPCIONAL) ------------------ */
        @media (max-width: 480px) {
            .container {
                margin: 0 1rem; /* Margen horizontal en pantallas pequeñas */
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">Acceso Denegado</h1>

        <p class="info-text">
            No tienes los permisos necesarios para acceder a este sistema o recurso.
        </p>

        {{-- Botón / Enlace para redirigir al usuario --}}
        <div style="text-align: center;">
            <a 
                href="{{ env('APILOGIN_URL', 'http://localhost:8000') }}/usuario" 
                class="btn"
            >
                Regresar
            </a>
        </div>
        </div>
</body>
</html>
