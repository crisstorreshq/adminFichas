<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use App\Models\Pacientes;
use App\Models\Carpeta;
use Illuminate\Validation\Rule;


class FichasController extends Controller
{
    // Listado de Fichas del FTP
    public function listFiles()
    {
        $files = Storage::disk('ftp')->files();

        return response()->json($files);
    }

    // Ver Ficha por el PAC_CAR_NumerFicha desde el FTP 
    public function verFicha($id)
    {
        $url = $id . '.pdf';

        if (!Storage::disk('ftp')->exists($url)) {
            return abort(404, 'El archivo no existe en el FTP');
        }

        $contenido = Storage::disk('ftp')->get($url);

        return response($contenido, 200)->header('Content-Type', 'application/pdf');
    }

    // Ver listado de pacientes, paginado
    public function listPacientes(Request $request)
    {
        $query = Pacientes::with('ficha');

        $perPage = $request->input('per_page', 10);
       
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('PAC_PAC_Rut', 'like', "%$search%")
                  ->orWhereHas('ficha', function ($q) use ($search) {
                      $q->where('PAC_CAR_NumerFicha', 'like', "%$search%");
                  });
        }
    
        $pacientes = $query->paginate($perPage);

    
        $data = $pacientes->map(function ($paciente) {
            return [
                'id'       => $paciente->PAC_PAC_Numero,
                'nombre'   => $paciente->nombre_paciente,
                'rut'      => $paciente->PAC_PAC_Rut,
                'ficha'    => $paciente->numero_ficha,
                'digital'    => $paciente->digital_ficha,
            ];
        });
    
        return response()->json([
            'data'       => $data,
            'total'      => $pacientes->total(),
            'per_page'   => $pacientes->perPage(),
            'current_page' => $pacientes->currentPage(),
        ]);
    }

    // asignar PAC_CAR_NumerFicha
    public function asignarFicha(Request $request)
    {
        $request->validate([
            'paciente_id' => 'required|exists:PAC_Paciente,PAC_PAC_Numero',
            'ficha' => [
                'required',
                'integer',
                'digits:6',
                Rule::unique('PAC_Carpeta', 'PAC_CAR_NumerFicha')
            ],
        ]);

        $carpeta = Carpeta::updateOrCreate(
            ['PAC_PAC_Numero' => $request->paciente_id],
            ['PAC_CAR_NumerFicha' => $request->ficha, 'PAC_CAR_EstadCarpe' => 'AC']
        );
    
        return response()->json([
            'message' => 'Ficha asignada correctamente',
            'ficha' => $carpeta->PAC_CAR_NumerFicha
        ], 200);
    }
}