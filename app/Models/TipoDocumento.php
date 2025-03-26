<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoDocumento extends Model
{
    protected $table = 'BD_BodegaFarmacia.dbo.TipoDocumento';
    protected $primaryKey = 'tipo_documento_id';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
    ];

    // Relación 1:N con Adquisicion
    public function adquisiciones()
    {
        return $this->hasMany(Adquisicion::class, 'tipo_documento_id');
    }
}
