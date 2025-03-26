<?php

namespace App\Http\Controllers;

use App\Models\Adquisicion;
use App\Models\TipoAdquisicion;
use App\Models\Transportistas;
use App\Models\TipoDocumento;
use App\Models\Proveedores;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreAdquisicionRequest;

class AdquisicionController extends Controller
{
    public function index()
    {
        // Recupera todas las adquisiciones con sus relaciones, paginadas
        $adquisiciones = Adquisicion::with([
            'tipoAdquisicion',
            'transportista',
            'tipoDocumento',
            'proveedor'
        ])->orderBy('id', 'desc')
          ->paginate(10);

        // Renderiza la vista Inertia, enviando datos
        return Inertia::render('Adquisicion/Index', [
            'adquisiciones' => $adquisiciones
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Cargar catálogos para combos desplegables
        $tiposAdquisicion = TipoAdquisicion::all();
        $transportistas   = Transportistas::all();
        $tiposDocumento   = TipoDocumento::all();
        $proveedores      = Proveedores::all();

        return Inertia::render('Adquisicion/Create', [
            'tiposAdquisicion' => $tiposAdquisicion,
            'transportistas'   => $transportistas,
            'tiposDocumento'   => $tiposDocumento,
            'proveedores'      => $proveedores
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdquisicionRequest $request)
    {
        $validated = $request->validated();

        Adquisicion::create($validated);
    
        return response()->json([
            'success' => true,
            'redirect' => route('adquisiciones.index'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $adquisicion = Adquisicion::with([
            'tipoAdquisicion',
            'transportista',
            'tipoDocumento',
            'proveedor',
            'insumos.material'
        ])->findOrFail($id);

        // Muestra la vista con los detalles
        return Inertia::render('Adquisicion/Show', [
            'adquisicion' => $adquisicion
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $adquisicion = Adquisicion::findOrFail($id);

        $tiposAdquisicion = TipoAdquisicion::all();
        $transportistas   = Transportistas::all();
        $tiposDocumento   = TipoDocumento::all();
        $proveedores      = Proveedores::all();

        return Inertia::render('Adquisicion/Edit', [
            'adquisicion'       => $adquisicion,
            'tiposAdquisicion'  => $tiposAdquisicion,
            'transportistas'    => $transportistas,
            'tiposDocumento'    => $tiposDocumento,
            'proveedores'       => $proveedores
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $adquisicion = Adquisicion::findOrFail($id);

        $validated = $request->validate([
            'tipo_adquisicion_id' => 'required|integer|exists:TipoAdquisicion,tipo_adquisicion_id',
            'fecha_recepcion'     => 'required|date',
            'transportista_id'    => 'nullable|integer|exists:Transportistas,transportista_id',
            'ot'                  => 'nullable|string|max:50',
            'tipo_documento_id'   => 'required|integer|exists:TipoDocumento,tipo_documento_id',
            'numero_oc'           => 'nullable|string|max:50',
            'proveedor_id'        => 'required|integer|exists:Proveedores,proveedor_id',
            'cantidad_bultos'     => 'nullable|integer',
            'numero_documento'    => 'nullable|string|max:50',
            'monto'               => 'nullable|numeric',
            'tens_id'             => 'nullable|integer',
            'qf_id'               => 'nullable|integer',
            'observacion'         => 'nullable|string|max:500',
        ]);

        $adquisicion->update($validated);

        return redirect()->route('adquisiciones.index')
                         ->with('success', 'Adquisición actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $adquisicion = Adquisicion::findOrFail($id);
        $adquisicion->delete();

        return redirect()->route('adquisiciones.index')
                         ->with('success', 'Adquisición eliminada exitosamente.');
    }
}
