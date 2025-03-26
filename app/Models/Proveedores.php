<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedores extends Model
{
    protected $table = 'BD_BodegaFarmacia.dbo.Proveedores';
    protected $primaryKey = 'proveedor_id';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'rut',
    ];

    // Relación 1:N con Adquisicion
    public function adquisiciones()
    {
        return $this->hasMany(Adquisicion::class, 'proveedor_id');
    }
}
