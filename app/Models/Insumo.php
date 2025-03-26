<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Insumo extends Model
{
    protected $table = 'BD_BodegaFarmacia.dbo.Insumo';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'adquisicion_id',
        'FLD_MATCODIGO',
        'serie_lote',
        'cantidad',
        'fecha_vencimiento',
        'cod_externo',
        'descripcion',
    ];

    // Relaciones
    public function adquisicion()
    {
        return $this->belongsTo(Adquisicion::class, 'adquisicion_id');
    }

    public function material()
    {
        return $this->belongsTo(TB_MATERIALES::class, 'FLD_MATCODIGO');
    }

    // Opcional: si quieres ver qué Despacho_Items usan este insumo
    public function despachoItems()
    {
        return $this->hasMany(DespachoItem::class, 'insumo_id');
    }
}
