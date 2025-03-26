<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Despacho extends Model
{
    protected $table = 'BD_BodegaFarmacia.dbo.Despacho';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'adquisicion_id',
        'presentacion_id',
        'destinatario_id',
        'recibe',
        'observacion',
    ];

    // Relación 1:1 con Adquisicion
    public function adquisicion()
    {
        // belongsTo => 'Despacho' tiene la fk 'adquisicion_id'
        return $this->belongsTo(Adquisicion::class, 'adquisicion_id');
    }

    public function presentacion()
    {
        return $this->belongsTo(Presentacion::class, 'presentacion_id');
    }

    public function destinatario()
    {
        return $this->belongsTo(Destinatario::class, 'destinatario_id');
    }

    // Un despacho tiene muchos Despacho_Items
    public function despachoItems()
    {
        return $this->hasMany(DespachoItem::class, 'despacho_id');
    }
}
