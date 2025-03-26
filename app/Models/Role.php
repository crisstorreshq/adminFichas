<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $connection = 'sqlsrv';
    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user_sistema')->withTimestamps()->withPivot('sistemas_id','vigencia');
    }

    public function sistemas()
    {
        return $this->belongsToMany(Sistemas::class, 'role_user_sistema')->withTimestamps()->withPivot('user_principal_id','vigencia');
    }
}