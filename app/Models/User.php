<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    //use HasApiTokens, HasFactory, Notifiable;
    use Notifiable;

    protected $primaryKey = 'principal_id';

    protected $table = 'sys.sql_logins';

    public $timestamps = false;

    protected $hidden = [
        'password_hash', 'sid', 'type', 'type_desc', 'create_date', 'modify_date', 'default_database_name', 'default_language_name', 'credential_id', 'is_policy_checked', 'is_expiration_checked'
    ];

    public function usuarios()
    {
        return $this->belongsTo(Usuarios::class, 'name', 'Segu_Usr_Cuenta');
    }

    public function perfil()
    {
        return $this->belongsTo(Token::class, 'principal_id', 'id_user');
    }

    public function tokenSave()
    {
        return $this->hasOne(Token::class);
    }
    
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user_sistema')->withTimestamps()->withPivot('sistemas_id','vigencia', 'id')->where('vigencia', true);
    }

    public function sistemas()
    {
        return $this->belongsToMany(Sistemas::class, 'role_user_sistema')->withTimestamps()->withPivot('role_id','vigencia')->where('vigencia', true);
    }

    public static function getAuth($username)
    {
        $data = User::with('sistemas','usuarios')->where('name', $username)->get()->toArray();
        $sistemas  = [9];

        if( $data[0]['usuarios']['Segu_Vigente'] === 'si' )
        {
            foreach ($sistemas as $id) 
            {
                if(ctype_digit(strval(array_search($id, array_column($data[0]['sistemas'], 'id')))))
                {
                    return true;
                }
            }
        }
    }
}
