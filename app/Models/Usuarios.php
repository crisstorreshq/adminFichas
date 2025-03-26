<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    protected $table = 'Segu_Usuarios';

    protected $fillable = [
         'Segu_Usr_Nombre', 'Segu_Usr_ApellidoPaterno', 'Segu_Usr_ApellidoMaterno', 'Segu_Usr_RUT'
    ];

    protected $primaryKey = 'Segu_Usr_Cuenta';

    public $timestamps = false;

    protected $keyType= 'string';

    protected $hidden = [
        'Segu_Usr_Descripcion', 'Segu_Usr_FuncionAdmnistr', 'Segu_Usr_Codigo', 'Segu_FLD_CCCODIGO', 'ID_Establecimiento', 'Segu_Usr_CambioClave', 'Segu_Usr_CambioCodigo', 'Segu_Usr_CodigoAnt', 'Segu_Usr_Fono', 'Segu_Usr_Mail', 'enfESI', 'Segu_Usr_Cuenta' ];
        
    public function getNombreUsuarioAttribute()
    {
        return "{$this->Segu_Usr_Nombre} {$this->Segu_Usr_ApellidoPaterno} {$this->Segu_Usr_ApellidoMaterno}";
    }
}