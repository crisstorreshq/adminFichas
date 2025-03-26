<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destinatario extends Model
{
    protected $table = 'BD_BodegaFarmacia.dbo.Destinatario';
    protected $primaryKey = 'destinatario_id';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
    ];

    // Relación 1:N con Despacho
    public function despachos()
    {
        return $this->hasMany(Despacho::class, 'destinatario_id');
    }
}
