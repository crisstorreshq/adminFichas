<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\TipoAdquisicion;
use App\Models\Transportistas;
use App\Models\TipoDocumento;
use App\Models\Proveedores;

class StoreAdquisicionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'tipo_adquisicion_id' => 'required|integer',
            'fecha_recepcion'     => 'required|date',
            'transportista_id'    => 'required|integer',
            'ot'                  => 'nullable|string|max:50',
            'tipo_documento_id'   => 'required|integer',
            'numero_oc'           => 'nullable|string|max:50',
            'proveedor_id'        => 'required|integer',
            'cantidad_bultos'     => 'nullable|integer',
            'numero_documento'    => 'nullable|string|max:50',
            'monto'               => 'nullable|numeric',
            'tens_id'             => 'nullable|integer',
            'qf_id'               => 'nullable|integer',
            'observacion'         => 'nullable|string|max:500',
        ];
    }
    
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!TipoAdquisicion::find($this->tipo_adquisicion_id)) {
                $validator->errors()->add('tipo_adquisicion_id', 'Tipo Adquisición inválido.');
            }
            if (!TipoDocumento::find($this->tipo_documento_id)) {
                $validator->errors()->add('tipo_documento_id', 'Tipo Documento inválido.');
            }
            if (!Proveedores::find($this->proveedor_id)) {
                $validator->errors()->add('proveedor_id', 'Proveedor inválido.');
            }
            if ($this->transportista_id && !Transportistas::find($this->transportista_id)) {
                $validator->errors()->add('transportista_id', 'Transportista inválido.');
            }
        });
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], 422));
    }
}