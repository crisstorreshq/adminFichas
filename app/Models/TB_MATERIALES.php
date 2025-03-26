<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TB_MATERIALES extends Model
{
    protected $table = 'BD_ABASTECIMIENTO.dbo.TB_MATERIALES';
    protected $primaryKey = 'FLD_MATCODIGO';
    public $timestamps = false;

    protected $fillable = [
        'FLD_MATCODIGO',
        'FLD_MATNOMBRE',
        'FLD_GMACODIGO',
        'Vigente',
    ];

    // Relación 1:N con Insumo
    public function insumos()
    {
        return $this->hasMany(Insumo::class, 'FLD_MATCODIGO');
    }
}
