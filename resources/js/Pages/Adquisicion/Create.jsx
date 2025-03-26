import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

import axios from 'axios';

import { useForm, Link } from '@inertiajs/inertia-react';
import Layout from '@/Layouts/Layout';
import PageContainer from '@/Layouts/Contenedor/PageContainer';
import CardComponent from '@/Components/Card/CardComponent';
import CardHeader from '@/Components/Card/CardHeader';
import CardContent from '@/Components/Card/CardContent';

import AutoCompleteInput from '@/Components/Form/AutoCompleteInput';
import TextInput from '@/Components/Form/TextInput';

import {
  Button,
  Grid,
} from '@mui/material';

const breadcrumbs = [
  { label: "Inicio", url: "/", isActive: false },
  { label: "Adquisiciones", url: route('adquisiciones.index'), isActive: false },
  { label: "Crear", isActive: true },
];

export default function Create(props) {
  const { transportistas, proveedores, tiposAdquisicion, tiposDocumento, tensList, qfList } = props;

  const { data, setData, post, processing, errors, setError } = useForm({
    tipo_adquisicion_id: '',
    tipo_documento_id: '',
    fecha_recepcion: '',
    transportista_id: '',
    ot: '',
    numero_oc: '',
    proveedor_id: '',
    cantidad_bultos: '',
    numero_documento: '',
    monto: '',
    tens_id: '',
    qf_id: '',
    observacion: '',
  });

  const submit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post(route('adquisiciones.store'), data);
      window.location.href = route('adquisiciones.index');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const serverErrors = error.response.data.errors;
        const formatted = Object.fromEntries(
          Object.entries(serverErrors).map(([key, value]) => [key, value[0]])
        );
        setError(formatted);
      }
    }
  };

  return (
    <Layout auth={props.auth}>
      <PageContainer heading={"Nueva Adquisición"} breadcrumbs={breadcrumbs}>
        <CardComponent>
          <CardHeader
            title={"Documento"}
            subTitle={"Completa los campos para registrar un nuevo documento"}
          />
          <CardContent>
            <form onSubmit={submit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <AutoCompleteInput
                    label="Tipo Adquisición"
                    options={tiposAdquisicion}
                    value={data.tipo_adquisicion_id}
                    onChange={(val) => setData('tipo_adquisicion_id', val)}
                    optionLabel="nombre"
                    optionValue="tipo_adquisicion_id"
                    error={errors.tipo_adquisicion_id}
                    helperText={errors.tipo_adquisicion_id}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <AutoCompleteInput
                    label="Tipo Documento"
                    options={tiposDocumento}
                    value={data.tipo_documento_id}
                    onChange={(val) => setData('tipo_documento_id', val)}
                    optionLabel="nombre"
                    optionValue="tipo_documento_id"
                    error={errors.tipo_documento_id}
                    helperText={errors.tipo_documento_id}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextInput
                    label="Fecha Recepción"
                    type="date"
                    value={data.fecha_recepcion}
                    onChange={(e) => setData('fecha_recepcion', e.target.value)}
                    error={errors.fecha_recepcion}
                    helperText={errors.fecha_recepcion}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <AutoCompleteInput
                    label="Transportista"
                    options={transportistas}
                    value={data.transportista_id}
                    onChange={(val) => setData('transportista_id', val)}
                    optionLabel="nombre"
                    optionValue="transportista_id"
                    error={errors.transportista_id}
                    helperText={errors.transportista_id}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextInput
                    label="OT"
                    value={data.ot}
                    onChange={(e) => setData('ot', e.target.value)}
                    error={errors.ot}
                    helperText={errors.ot}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextInput
                    label="Número OC"
                    value={data.numero_oc}
                    onChange={(e) => setData('numero_oc', e.target.value)}
                    error={errors.numero_oc}
                    helperText={errors.numero_oc}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <AutoCompleteInput
                    label="Proveedor"
                    options={proveedores}
                    value={data.proveedor_id}
                    onChange={(val) => setData('proveedor_id', val)}
                    optionLabel="nombre"
                    optionValue="proveedor_id"
                    error={errors.proveedor_id}
                    helperText={errors.proveedor_id}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextInput
                    label="Cantidad Bultos"
                    type="number"
                    value={data.cantidad_bultos}
                    onChange={(e) => setData('cantidad_bultos', e.target.value)}
                    error={errors.cantidad_bultos}
                    helperText={errors.cantidad_bultos}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextInput
                    label="Número Documento"
                    value={data.numero_documento}
                    onChange={(e) => setData('numero_documento', e.target.value)}
                    error={errors.numero_documento}
                    helperText={errors.numero_documento}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextInput
                    label="Monto"
                    type="number"
                    value={data.monto}
                    onChange={(e) => setData('monto', e.target.value)}
                    error={errors.monto}
                    helperText={errors.monto}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <AutoCompleteInput
                    label="TENS"
                    options={tensList}
                    value={data.tens_id}
                    onChange={(val) => setData('tens_id', val)}
                    optionLabel="nombre"
                    optionValue="id"
                    error={errors.tens_id}
                    helperText={errors.tens_id}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <AutoCompleteInput
                    label="QF"
                    options={qfList}
                    value={data.qf_id}
                    onChange={(val) => setData('qf_id', val)}
                    optionLabel="nombre"
                    optionValue="id"
                    error={errors.qf_id}
                    helperText={errors.qf_id}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    label="Observación"
                    value={data.observacion}
                    onChange={(e) => setData('observacion', e.target.value)}
                    error={errors.observacion}
                    helperText={errors.observacion}
                    multiline
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={processing}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    href={route('adquisiciones.index')}
                    sx={{ ml: 2 }}
                  >
                    Cancelar
                  </Button>
                </Grid>

              </Grid>
            </form>
          </CardContent>
        </CardComponent>
      </PageContainer>
    </Layout>
  );
}