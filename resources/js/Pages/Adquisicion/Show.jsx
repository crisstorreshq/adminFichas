import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Layout from '@/Layouts/Layout';
import PageContainer from '@/Layouts/Contenedor/PageContainer';
import CardComponent from '@/Components/Card/CardComponent';
import CardHeader from '@/Components/Card/CardHeader';
import CardContent from '@/Components/Card/CardContent';

import Button from '@mui/material/Button';

const breadcrumbs = [
  { label: "Inicio", url: "/", isActive: false },
  { label: "Adquisiciones", url: route('adquisiciones.index'), isActive: false },
  { label: "Detalle", isActive: true },
];

export default function Show(props) {
  const { adquisicion } = props;
  // adquisicion viene con sus relaciones: proveedor, insumos, etc.

  return (
    <Layout auth={props.auth}>
      <PageContainer heading={`Adquisición #${adquisicion.id}`} breadcrumbs={breadcrumbs}>
        <CardComponent>
          <CardHeader
            title={`Detalle de la Adquisición #${adquisicion.id}`}
            subTitle={"Información completa"}
          />
          <CardContent>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Número Documento:</strong> {adquisicion.numero_documento}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Fecha de Recepción:</strong> {adquisicion.fecha_recepcion}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Proveedor:</strong> 
              {adquisicion.proveedor 
                ? adquisicion.proveedor.nombre 
                : 'Sin proveedor'}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Monto:</strong> {adquisicion.monto}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Observación:</strong> {adquisicion.observacion}
            </div>

            {/* Si quieres mostrar insumos asociados */}
            {adquisicion.insumos && adquisicion.insumos.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3>Insumos de esta adquisición</h3>
                <ul>
                  {adquisicion.insumos.map((insumo) => (
                    <li key={insumo.id}>
                      Lote: {insumo.serie_lote} | Cantidad: {insumo.cantidad} |
                      Material: {insumo.material ? insumo.material.FLD_MATNOMBRE : 'N/A'}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginTop: '2rem' }}>
              <Button 
                variant="outlined" 
                component={Link} 
                href={route('adquisiciones.edit', adquisicion.id)}
              >
                Editar
              </Button>

              <Button 
                variant="text"
                style={{ marginLeft: '1rem' }}
                component={Link} 
                href={route('adquisiciones.index')}
              >
                Volver
              </Button>
            </div>
          </CardContent>
        </CardComponent>
      </PageContainer>
    </Layout>
  );
}
