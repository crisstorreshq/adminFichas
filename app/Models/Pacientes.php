<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DateTime;

class Pacientes extends Model
{
    protected $connection = 'sqlsrv';

    protected $table = 'PAC_Paciente';

	protected $primaryKey = 'PAC_PAC_Numero';

    public $timestamps = false;

    protected $hidden = [
        "PAC_PAC_CalleHabit", "PAC_PAC_DeparHabit", "PAC_PAC_PoblaHabit", "PAC_PAC_ComunHabit", "PAC_PAC_CiudaHabit", "PAC_PAC_RegioHabit", "PAC_PAC_CalleTempo", "PAC_PAC_NumerTempo", "PAC_PAC_DeparTempo", "PAC_PAC_PoblaTempo", "PAC_PAC_ComunTempo", "PAC_PAC_CiudaTempo", "PAC_PAC_RegioTempo", "PAC_PAC_Profesion", "PAC_PAC_Religion", "PAC_PAC_Ocupacion", "PAC_PAC_EstadCivil", "PAC_PAC_FechaIngre", "PAC_PAC_Origen", "PAC_PAC_FechaModif", "PAC_PAC_FechaFallec", "PAC_PAC_TimeStamp", "PAC_PAC_Soundex", "PAC_PAC_FechaUaten", "PAC_PAC_Clasificado", "PAC_PAC_ClaseCodigo", "PAC_PAC_Cotizante", "PAC_PAC_FonoTempo", "PAC_PAC_CodigUsuar", "PAC_PAC_CodigInsti", "PAC_PAC_NumeroRayos", "PAC_PAC_FechaVenci", "PAC_PAC_CorrAutori", "PAC_PAC_NroPasaporte", "PAC_PAC_Sector", "PAC_PAC_Etnia", "PAC_PAC_Prais", "PAC_PAC_Ruralidad", "PAC_PAC_ClaseVia", "PAC_PAC_CIUCodigo", "PAC_PAC_CorreoCuerpo", "PAC_PAC_CorreoExtension", "PAC_PAC_MotPacSinRut", "NAC_Ide", "PAC_PAC_NivelInstruccion", "PAC_PAC_ActivoInactivo", "PAC_PAC_PacTrans", "PAC_PAC_FichaPasiva", "PAC_PAC_FonoNumerico", "PAC_PAC_TelefonoMovilNumerico", "PAC_PAC_Codigo"
    ];

    public function getEdadPacienteAttribute()
    {
        $cumpleanos = new DateTime($this->PAC_PAC_FechaNacim);
        $hoy = new DateTime();
        $annos = $hoy->diff($cumpleanos);
        return "{$annos->y}";
    }

    public function getNombrePacienteAttribute()
    {
        return "{$this->PAC_PAC_Nombre} {$this->PAC_PAC_ApellPater} {$this->PAC_PAC_ApellMater}";
    }

    public function getPrevisionPacienteAttribute()
    {
        $prev = '';
        trim($this->PAC_PAC_Prevision) === 'F' ? $prev = 'Fonasa' : $prev ='Otro';
        return "{$prev} $this->PAC_PAC_TipoBenef";
    }

    public function getSexoPacienteAttribute()
    {
        $sexo = '';
        trim($this->PAC_PAC_Sexo) === 'F' ? $sexo = 'Femenino' : $sexo ='Masculino';
        return "{$sexo}";
    }

    public function carpeta()
    {
        return $this->belongsTo(Carpeta::class, 'PAC_PAC_Numero', 'PAC_PAC_Numero');
    }

    public function nacionalidad()
    {
        return $this->belongsTo(Nacionalidad::class, 'NAC_Ide', 'NAC_Ide');
    }

    public function ficha()
    {
        return $this->hasOne(Carpeta::class, 'PAC_PAC_Numero', 'PAC_PAC_Numero');
    }

    public function getNumeroFichaAttribute()
    {
        return $this->ficha ? $this->ficha->PAC_CAR_NumerFicha : null;
    }

    public function getDigitalFichaAttribute()
    {
        return $this->ficha ? ($this->ficha->Digital ? 1 : 0) : null;
    }

}
