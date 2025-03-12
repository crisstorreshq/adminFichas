<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unidad extends Model
{
    protected $table = 'BD_PPV.dbo.PPV_Servicios';

    public $timestamps = false;

    protected $primaryKey = 'ID';

    protected $fillable = [
        'ID', 'servicio', 'vigente', 'cod_rel_servicio'
    ];
}