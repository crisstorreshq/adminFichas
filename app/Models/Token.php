<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    protected $table = 'auth_remember_token';

    protected $primaryKey = 'id_user';

    protected $fillable = [
         'remember_token', 'id_user', 'id_servicio', 'id_profesional'
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

}