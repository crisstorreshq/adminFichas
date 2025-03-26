<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DespachoItem extends Model
{
    protected $table = 'BD_BodegaFarmacia.dbo.Despacho_Item';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'despacho_id',
        'insumo_id',
        'cantidad_despachada',
        'observacion',
    ];

    // Relación con Despacho
    public function despacho()
    {
        return $this->belongsTo(Despacho::class, 'despacho_id');
    }

    // Relación con Insumo (si despachas lotes específicos)
    public function insumo()
    {
        return $this->belongsTo(Insumo::class, 'insumo_id');
    }
}
