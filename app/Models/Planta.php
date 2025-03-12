<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Planta extends Model
{
    protected $table = 'BD_DDP.dbo.Planta';

    public $timestamps = false;

    protected $fillable = [
        'name', 'estado'
    ];
}