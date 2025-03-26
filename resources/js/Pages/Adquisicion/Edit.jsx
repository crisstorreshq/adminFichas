import React from 'react';
import { useForm, Link } from '@inertiajs/inertia-react';
import Layout from '@/Layouts/Layout';
import PageContainer from '@/Layouts/Contenedor/PageContainer';
import CardComponent from '@/Components/Card/CardComponent';
import CardHeader from '@/Components/Card/CardHeader';
import CardContent from '@/Components/Card/CardContent';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const breadcrumbs = [
  { label: "Inicio", url: "/", isActive: false },
  { label: "Adquisiciones", url: route('adquisiciones.index'), isActive: false },
  { label: "Editar", isActive: true },
];

export default function Edit(props) {
  const { adquisicion, tiposAdquisicion, proveedores } = props;

  const { data, setData, put, processing, errors } = useForm({
    tipo_adquisicion_id: adquisicion.tipo_adquisicion_id || '',
    fecha_recepcion: adquisicion.fecha_recepcion || '',
    numero_documento: adquisicion.numero_documento || '',
    monto: adquisicion.monto || '',
    proveedor_id: adquisicion.proveedor_id || '',
    observacion: adquisicion.observacion || '',
  });

  function submit(e) {
    e.preventDefault();
    // Actualiza usando método PUT
    put(route('adquisiciones.update', adquisicion.id));
  }

  return (
    <Layout auth={props.auth}>
      <PageContainer heading={"Editar Adquisición"} breadcrumbs={breadcrumbs}>
        <CardComponent>
          <CardHeader
            title={`Editar adquisición #${adquisicion.id}`}
            subTitle={"Modifica los campos necesarios"}
          />
          <CardContent>
            <form onSubmit={submit}>
              <div style={{ marginBottom: '1rem' }}>
                <FormControl fullWidth>
                  <label>Tipo Adquisición</label>
                  <Select
                    value={data.tipo_adquisicion_id}
                    onChange={(e) => setData('tipo_adquisicion_id', e.target.value)}
                    error={Boolean(errors.tipo_adquisicion_id)}
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {tiposAdquisicion && tiposAdquisicion.map((tipo) => (
                      <MenuItem key={tipo.tipo_adquisicion_id} value={tipo.tipo_adquisicion_id}>
                        {tipo.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.tipo_adquisicion_id && (
                    <div style={{ color: 'red' }}>{errors.tipo_adquisicion_id}</div>
                  )}
                </FormControl>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Fecha de Recepción"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={data.fecha_recepcion}
                  onChange={(e) => setData('fecha_recepcion', e.target.value)}
                  error={Boolean(errors.fecha_recepcion)}
                  helperText={errors.fecha_recepcion}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Número Documento"
                  value={data.numero_documento}
                  onChange={(e) => setData('numero_documento', e.target.value)}
                  error={Boolean(errors.numero_documento)}
                  helperText={errors.numero_documento}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Monto"
                  type="number"
                  value={data.monto}
                  onChange={(e) => setData('monto', e.target.value)}
                  error={Boolean(errors.monto)}
                  helperText={errors.monto}
                />
              </div>

              {/* Ejemplo select Proveedor */}
              <div style={{ marginBottom: '1rem' }}>
                <FormControl fullWidth>
                  <label>Proveedor</label>
                  <Select
                    value={data.proveedor_id}
                    onChange={(e) => setData('proveedor_id', e.target.value)}
                    error={Boolean(errors.proveedor_id)}
                  >
                    <MenuItem value="">Seleccione proveedor</MenuItem>
                    {proveedores && proveedores.map((prov) => (
                      <MenuItem key={prov.proveedor_id} value={prov.proveedor_id}>
                        {prov.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.proveedor_id && (
                    <div style={{ color: 'red' }}>{errors.proveedor_id}</div>
                  )}
                </FormControl>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  multiline
                  fullWidth
                  label="Observación"
                  value={data.observacion}
                  onChange={(e) => setData('observacion', e.target.value)}
                  error={Boolean(errors.observacion)}
                  helperText={errors.observacion}
                />
              </div>

              <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                disabled={processing}
              >
                Actualizar
              </Button>

              <Button 
                variant="outlined" 
                style={{ marginLeft: '1rem' }}
                component={Link}
                href={route('adquisiciones.index')}
              >
                Cancelar
              </Button>
            </form>
          </CardContent>
        </CardComponent>
      </PageContainer>
    </Layout>
  );
}
