<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;

class UsuarioJWT extends Authenticatable implements JWTSubject
{
    use SoftDeletes;

    protected $connection = 'sqlsrvUsers';
    protected $table = 'usuarios';
    protected $primaryKey = 'id';

    protected $fillable = [
        'NombreUsuario', 
        'EmailUsuario', 
        'Rut', 
        'password', 
        'RolID',
        'NumeroTelefono',
        'Nombre',
        'ApellidoPaterno',
        'ApellidoMaterno',
        'is_active',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'deleted_at',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public $timestamps = true;

    // App\Models\UsuarioJWT.php

    public function user()
    {
        // belongsTo(ModelRelacion, 'columna_foreign_key_en_UsuarioJWT', 'columna_local_key_en_User');
        return $this->belongsTo(User::class, 'NombreUsuario', 'name');
    }

     /**
     * Accesor "perfil" para imitar la relación del modelo User.
     *
     * Así, si en el código viejo hacen Auth::user()->perfil->id_servicio,
     * ahora funcionará aunque Auth::user() sea un UsuarioJWT.
     */
    public function getPerfilAttribute()
    {

        // Esto NO es una relación, es un "accesor".
        // Retornamos $this->user->perfil o null si no hay $this->user.
        return $this->user ? $this->user->perfil : null;
    }

    /**
     * Emula la relación "usuarios" de User
     * (para no romper el código que hace Auth::user()->usuarios).
     */
    public function getUsuariosAttribute()
    {
// Llamamos a $this->user->usuarios si existe $this->user;
        // si no existe, devolvemos null.
        return $this->user ? $this->user->usuarios : null;
    }

    /********************************
     * Emular la relación "tokenSave"
     ********************************/
    public function getTokenSaveAttribute()
    {
        return $this->user ? $this->user->tokenSave : null;
    }

    /********************************
     * Emular la relación "roles"
     ********************************/
    public function getRolesAttribute()
    {
        return $this->user ? $this->user->roles : null;
    }

    /********************************
     * Emular la relación "sistemas"
     ********************************/
    public function getSistemasAttribute()
    {
        return $this->user ? $this->user->sistemas : null;
    }

    public function checkRole($roles)
    {
        // Verifica si existe la relación con User
        if ($this->user) {
            // Asumiendo que el método checkRole de la clase User NO sea estático
            // (si es estático, lo llamas con User::checkRole($roles))
            return $this->user->checkRole($roles);
        }
        return false;
    }

    public function getAuth($username, $sys)
    {
        // Verifica si existe la relación con User
        if ($this->user) {
            // Asumiendo que el método checkRole de la clase User NO sea estático
            // (si es estático, lo llamas con User::checkRole($roles))
            return $this->user->getAuth($roles,$sys);
        }
        return false;
    }

    public function getJWTIdentifier()
    {
        // Retorna la PK del usuario
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        // Puedes retornar un array con claims personalizados
        return [];
    }

    public function toArray()
    {
        // Si existe la relación con User...
        if ($this->user) {
            // Carga las relaciones que necesites para replicar la antigua estructura
            // por ejemplo: perfil, usuarios, sistemas.
            $this->user->load('perfil.unidad', 'usuarios', 'sistemas');
    
            // Ahora sí, se incluirán en el array final
            $userArray = $this->user->toArray();

    
            return $userArray;
        }
    
        return parent::toArray();
    }
    

}