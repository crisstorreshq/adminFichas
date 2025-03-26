<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoAdquisicion extends Model
{
    protected $table = 'BD_BodegaFarmacia.dbo.TipoAdquisicion';
    protected $primaryKey = 'tipo_adquisicion_id';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
    ];

    // Relación 1:N con Adquisicion
    public function adquisiciones()
    {
        return $this->hasMany(Adquisicion::class, 'tipo_adquisicion_id');
    }
}
