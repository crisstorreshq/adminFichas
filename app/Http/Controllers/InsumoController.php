<?php

namespace App\Http\Controllers;

use App\Models\Insumo;
use App\Models\Adquisicion;
use App\Models\TB_MATERIALES;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InsumoController extends Controller
{
    public function index()
    {
        // Cargamos los insumos con su adquisición y material
        $insumos = Insumo::with(['adquisicion', 'material'])
            ->orderBy('id', 'desc')
            ->paginate(10);

        return Inertia::render('Insumo/Index', [
            'insumos' => $insumos
        ]);
    }

    public function create()
    {
        // Cargar listas: adquisiciones, materiales
        $adquisiciones = Adquisicion::all();
        $materiales    = TB_MATERIALES::all();

        return Inertia::render('Insumo/Create', [
            'adquisiciones' => $adquisiciones,
            'materiales'    => $materiales
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'adquisicion_id'   => 'required|integer|exists:Adquisicion,id',
            'FLD_MATCODIGO'    => 'required|integer|exists:TB_MATERIALES,FLD_MATCODIGO',
            'serie_lote'       => 'nullable|string|max:50',
            'cantidad'         => 'required|integer',
            'fecha_vencimiento'=> 'nullable|date',
            'cod_externo'      => 'nullable|string|max:50',
            'descripcion'      => 'nullable|string|max:200',
        ]);

        Insumo::create($validated);

        return redirect()->route('insumos.index')
                         ->with('success', 'Insumo creado correctamente.');
    }

    public function show($id)
    {
        $insumo = Insumo::with(['adquisicion', 'material'])->findOrFail($id);

        return Inertia::render('Insumo/Show', [
            'insumo' => $insumo
        ]);
    }

    public function edit($id)
    {
        $insumo        = Insumo::findOrFail($id);
        $adquisiciones = Adquisicion::all();
        $materiales    = TB_MATERIALES::all();

        return Inertia::render('Insumo/Edit', [
            'insumo'        => $insumo,
            'adquisiciones' => $adquisiciones,
            'materiales'    => $materiales
        ]);
    }

    public function update(Request $request, $id)
    {
        $insumo = Insumo::findOrFail($id);

        $validated = $request->validate([
            'adquisicion_id'   => 'required|integer|exists:Adquisicion,id',
            'FLD_MATCODIGO'    => 'required|integer|exists:TB_MATERIALES,FLD_MATCODIGO',
            'serie_lote'       => 'nullable|string|max:50',
            'cantidad'         => 'required|integer',
            'fecha_vencimiento'=> 'nullable|date',
            'cod_externo'      => 'nullable|string|max:50',
            'descripcion'      => 'nullable|string|max:200',
        ]);

        $insumo->update($validated);

        return redirect()->route('insumos.index')
                         ->with('success', 'Insumo actualizado correctamente.');
    }

    public function destroy($id)
    {
        $insumo = Insumo::findOrFail($id);
        $insumo->delete();

        return redirect()->route('insumos.index')
                         ->with('success', 'Insumo eliminado correctamente.');
    }
}
