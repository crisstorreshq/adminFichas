<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sistemas extends Model
{
    protected $table = 'sistemas';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'nombre', 'vigencia', 'descripcion'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user_sistema')->withTimestamps()->withPivot('role_id','vigencia');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user_sistema')->withTimestamps()->withPivot('user_principal_id','vigencia');
    }
}