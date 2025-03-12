<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carpeta extends Model
{
    protected $table = 'PAC_Carpeta';

	protected $primaryKey = 'PAC_PAC_Numero';

    public $timestamps = false;

    protected $keyType= 'float';

    protected $fillable = [
        'Digital', 'PAC_CAR_EstadCarpe', 'PAC_PAC_Numero', 'PAC_CAR_NumerFicha'
    ];

    protected $hidden = [
        "PAC_CAR_Ubicacion", "PAC_CAR_EstadCarpe", "PAC_CAR_TimeStamp", "PAC_PAC_Numero", "PAC_CAR_FechaCrea", "PAC_CAR_Servicio", "PAC_CAR_Usuario", "PAC_CAR_FormaCarpe", "PAC_CAR_Copia", "PAC_CAR_Extraviada", "PAC_CAR_FechaExtra", "PAC_CAR_FechaPasiva", "PAC_CAR_FechaCopia", "PAC_CAR_FichaAnt", "PAC_CAR_ServiSalud", "PAC_CAR_Consultorio", "PAC_CAR_NumerUltCop", "PAC_CAR_CopiasVig", "Fld_CopiasImpresas", "PAC_CAR_CodBarraImp"
    ];
    
    public function paciente()
    {
        return $this->belongsTo(Pacientes::class, 'PAC_PAC_Numero', 'PAC_PAC_Numero');
    }

    protected $casts = [
        'PAC_CAR_NumerFicha' => 'int',
    ];
}