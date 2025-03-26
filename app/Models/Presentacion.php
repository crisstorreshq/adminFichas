<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Presentacion extends Model
{
    protected $table = 'BD_BodegaFarmacia.dbo.Presentacion';
    protected $primaryKey = 'presentacion_id';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
    ];

    // Relación 1:N con Despacho
    public function despachos()
    {
        return $this->hasMany(Despacho::class, 'presentacion_id');
    }
}
