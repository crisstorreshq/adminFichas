<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transportistas extends Model
{
    protected $table = 'BD_BodegaFarmacia.dbo.Transportistas';
    protected $primaryKey = 'transportista_id';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'rut',
    ];

    // Relación 1:N con Adquisicion
    public function adquisiciones()
    {
        return $this->hasMany(Adquisicion::class, 'transportista_id');
    }
}
