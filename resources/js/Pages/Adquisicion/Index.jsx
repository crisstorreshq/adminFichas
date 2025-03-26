import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Layouts/Layout';
import PageContainer from '@/Layouts/Contenedor/PageContainer';
import CardComponent from '@/Components/Card/CardComponent';
import CardHeader from '@/Components/Card/CardHeader';
import CardContent from '@/Components/Card/CardContent';

// Importas componentes MUI que necesites
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const breadcrumbs = [
  { label: "Inicio", url: "/", isActive: false },
  { label: "Adquisiciones", isActive: true },
];

export default function Index(props) {
  const { adquisiciones } = props; 
  // 'adquisiciones' viene del controlador -> with('adquisiciones')
  // típicamente un LengthAwarePaginator con 'data', 'links', etc.

  return (
    <Layout auth={props.auth}>
      <PageContainer heading={"Adquisiciones"} breadcrumbs={breadcrumbs}>
        <CardComponent>
          <CardHeader 
            title={"Lista de Adquisiciones"} 
            subTitle={"Revisa las adquisiciones registradas"} 
            // Podrías poner acciones aquí
          />
          <CardContent>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              href={route('adquisiciones.create')}
              style={{ marginBottom: '1rem' }}
            >
              Nueva Adquisición
            </Button>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Documento</TableCell>
                    <TableCell>Fecha Recepción</TableCell>
                    <TableCell>Proveedor</TableCell>
                    <TableCell>Monto</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adquisiciones.data.map((adq) => (
                    <TableRow key={adq.id}>
                      <TableCell>{adq.id}</TableCell>
                      <TableCell>{adq.numero_documento}</TableCell>
                      <TableCell>{adq.fecha_recepcion}</TableCell>
                      <TableCell>
                        {adq.proveedor
                          ? adq.proveedor.nombre
                          : 'Sin proveedor'}
                      </TableCell>
                      <TableCell>{adq.monto}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          component={Link}
                          href={route('adquisiciones.edit', adq.id)}
                        >
                          Editar
                        </Button>

                        <Button 
                          variant="outlined" 
                          size="small"
                          component={Link}
                          href={route('adquisiciones.show', adq.id)}
                          style={{ marginLeft: '0.5rem' }}
                        >
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Ejemplo de paginación con links de Inertia, si 'adquisiciones' es un paginador */}
            <div style={{ marginTop: '1rem' }}>
              {adquisiciones.links.map((link, index) => (
                <Button
                  key={index}
                  variant={link.active ? "contained" : "text"}
                  onClick={() => {
                    if (!link.url) return;
                    window.location.href = link.url;
                  }}
                  disabled={!link.url}
                  style={{ marginRight: '0.5rem' }}
                >
                  {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                </Button>
              ))}
            </div>
          </CardContent>
        </CardComponent>
      </PageContainer>
    </Layout>
  );
}
