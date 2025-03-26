<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adquisicion extends Model
{
    protected $table = 'BD_BodegaFarmacia.dbo.Adquisicion';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'tipo_adquisicion_id',
        'fecha_recepcion',
        'transportista_id',
        'ot',
        'tipo_documento_id',
        'numero_oc',
        'proveedor_id',
        'cantidad_bultos',
        'numero_documento',
        'monto',
        'tens_id',
        'qf_id',
        'observacion',
    ];

    // Relaciones
    public function tipoAdquisicion()
    {
        return $this->belongsTo(TipoAdquisicion::class, 'tipo_adquisicion_id');
    }

    public function transportista()
    {
        return $this->belongsTo(Transportistas::class, 'transportista_id');
    }

    public function tipoDocumento()
    {
        return $this->belongsTo(TipoDocumento::class, 'tipo_documento_id');
    }

    public function proveedor()
    {
        return $this->belongsTo(Proveedores::class, 'proveedor_id');
    }

    // Adquisición tiene muchos Insumos
    public function insumos()
    {
        return $this->hasMany(Insumo::class, 'adquisicion_id');
    }

    // Relación 1:1 con Despacho (opcional)
    public function despacho()
    {
        // hasOne => la tabla 'Despacho' tiene la fk 'adquisicion_id'
        return $this->hasOne(Despacho::class, 'adquisicion_id');
    }
}
