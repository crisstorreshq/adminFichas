<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfesionUser extends Model
{
    protected $connection = 'sqlsrv';

    protected $table = 'auth_tipo_profesional';

    public $timestamps = false;

    protected $fillable = [
        'id', 'nombre', 'estado'
    ];
}