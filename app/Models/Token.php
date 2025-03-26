<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    protected $table = 'auth_remember_token';
    protected $connection = 'sqlsrv';

    protected $primaryKey = 'id_user';

    protected $fillable = [
        'id',
        'username',
        'remember_token',
        'id_servicio',
        'id_profesional',
        'id_especialidad',
    ];

    protected $hidden = [
    	'id', 'id_user'
    ];

    public $timestamps = false;

    public function unidad()
    {
        return $this->belongsTo(Unidad::class, 'id_servicio', 'ID');
    }

    public function profesion()
    {
        return $this->belongsTo(ProfesionUser::class, 'id_profesional', 'id');
    }

    protected $casts = [
        'username' => 'string',
        'id_servicio' => 'int',
        'id_profesional' => 'int',
    ];

}