<?php

namespace App\Http\Controllers;

use App\Models\Despacho;
use App\Models\Adquisicion;
use App\Models\Presentacion;
use App\Models\Destinatario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DespachoController extends Controller
{
    public function index()
    {
        $despachos = Despacho::with([
            'adquisicion',
            'presentacion',
            'destinatario'
        ])->orderBy('id', 'desc')
          ->paginate(10);

        return Inertia::render('Despacho/Index', [
            'despachos' => $despachos
        ]);
    }

    public function create()
    {
        // Cargar catálogos y adquisiciones
        $adquisiciones = Adquisicion::all();
        $presentaciones = Presentacion::all();
        $destinatarios  = Destinatario::all();

        return Inertia::render('Despacho/Create', [
            'adquisiciones' => $adquisiciones,
            'presentaciones' => $presentaciones,
            'destinatarios'  => $destinatarios
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'adquisicion_id'   => 'required|integer|exists:Adquisicion,id',
            'presentacion_id'  => 'nullable|integer|exists:Presentacion,presentacion_id',
            'destinatario_id'  => 'nullable|integer|exists:Destinatario,destinatario_id',
            'recibe'           => 'nullable|integer', 
            'observacion'      => 'nullable|string|max:500',
        ]);

        Despacho::create($validated);

        return redirect()->route('despachos.index')
                         ->with('success', 'Despacho creado correctamente.');
    }

    public function show($id)
    {
        $despacho = Despacho::with([
            'adquisicion',
            'presentacion',
            'destinatario',
            'despachoItems.insumo'
        ])->findOrFail($id);

        return Inertia::render('Despacho/Show', [
            'despacho' => $despacho
        ]);
    }

    public function edit($id)
    {
        $despacho = Despacho::findOrFail($id);

        $adquisiciones = Adquisicion::all();
        $presentaciones = Presentacion::all();
        $destinatarios  = Destinatario::all();

        return Inertia::render('Despacho/Edit', [
            'despacho'       => $despacho,
            'adquisiciones'  => $adquisiciones,
            'presentaciones' => $presentaciones,
            'destinatarios'  => $destinatarios
        ]);
    }

    public function update(Request $request, $id)
    {
        $despacho = Despacho::findOrFail($id);

        $validated = $request->validate([
            'adquisicion_id'   => 'required|integer|exists:Adquisicion,id',
            'presentacion_id'  => 'nullable|integer|exists:Presentacion,presentacion_id',
            'destinatario_id'  => 'nullable|integer|exists:Destinatario,destinatario_id',
            'recibe'           => 'nullable|integer',
            'observacion'      => 'nullable|string|max:500',
        ]);

        $despacho->update($validated);

        return redirect()->route('despachos.index')
                         ->with('success', 'Despacho actualizado correctamente.');
    }

    public function destroy($id)
    {
        $despacho = Despacho::findOrFail($id);
        $despacho->delete();

        return redirect()->route('despachos.index')
                         ->with('success', 'Despacho eliminado correctamente.');
    }
}
