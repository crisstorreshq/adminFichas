<?php

namespace App\Http\Controllers;

use App\Models\DespachoItem;
use App\Models\Despacho;
use App\Models\Insumo; // O TB_MATERIALES según tu control de lotes
use Illuminate\Http\Request;
use Inertia\Inertia;

class DespachoItemController extends Controller
{
    public function index()
    {
        $items = DespachoItem::with(['despacho', 'insumo'])
            ->orderBy('id', 'desc')
            ->paginate(10);

        return Inertia::render('DespachoItem/Index', [
            'items' => $items
        ]);
    }

    public function create()
    {
        $despachos = Despacho::all();
        $insumos   = Insumo::all();

        return Inertia::render('DespachoItem/Create', [
            'despachos' => $despachos,
            'insumos'   => $insumos
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'despacho_id'         => 'required|integer|exists:Despacho,id',
            'insumo_id'           => 'required|integer|exists:Insumo,id',
            'cantidad_despachada' => 'required|integer',
            'observacion'         => 'nullable|string|max:500',
        ]);

        DespachoItem::create($validated);

        return redirect()->route('despacho-items.index')
                         ->with('success', 'Ítem de despacho creado correctamente.');
    }

    public function show($id)
    {
        $item = DespachoItem::with(['despacho', 'insumo'])->findOrFail($id);

        return Inertia::render('DespachoItem/Show', [
            'item' => $item
        ]);
    }

    public function edit($id)
    {
        $item      = DespachoItem::findOrFail($id);
        $despachos = Despacho::all();
        $insumos   = Insumo::all();

        return Inertia::render('DespachoItem/Edit', [
            'item'      => $item,
            'despachos' => $despachos,
            'insumos'   => $insumos
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = DespachoItem::findOrFail($id);

        $validated = $request->validate([
            'despacho_id'         => 'required|integer|exists:Despacho,id',
            'insumo_id'           => 'required|integer|exists:Insumo,id',
            'cantidad_despachada' => 'required|integer',
            'observacion'         => 'nullable|string|max:500',
        ]);

        $item->update($validated);

        return redirect()->route('despacho-items.index')
                         ->with('success', 'Ítem de despacho actualizado correctamente.');
    }

    public function destroy($id)
    {
        $item = DespachoItem::findOrFail($id);
        $item->delete();

        return redirect()->route('despacho-items.index')
                         ->with('success', 'Ítem de despacho eliminado correctamente.');
    }
}
