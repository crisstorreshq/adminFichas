import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, CircularProgress, Box, Button } from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import api from '@/api';

import DigitalizarFicha from './DigitalizarFicha';
import ModalAgregarFicha from './ModalAgregarFicha';
import ModalAgregarPdfFicha from './ModalAgregarPdfFicha';

const PacientesTable = () => {
    const [pacientes, setPacientes] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(null);
    const [openDigitalizar, setOpenDigitalizar] = useState(null);
    const [openModalAgregarPdf, setOpenModalAgregarPdf] = useState(null);

    useEffect(() => {
        fetchPacientes();
    }, [page, rowsPerPage]);

    const fetchPacientes = async () => {
        setLoading(true);
        try {
            const res = await api.getListPacientes(search, page + 1, rowsPerPage);
            setPacientes(res.data.data);
            setTotalRows(res.data.total);
        } catch (error) {
            console.error('Error al cargar los pacientes', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFichaAsignada = (id, ficha) => {
        setPacientes((prevPacientes) =>
            prevPacientes.map((paciente) =>
                paciente?.id === id ? { ...paciente, ficha, digital: 0  } : paciente
            )
        );
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchPacientes();
            setPage(0);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        fetchPacientes();
    };

    const handleViewFicha = (ficha) => {
        if (ficha) {
            window.open(`/vistaficha/${ficha}`, '_blank');
        }
    };

    const handleFichaDigitalizada = (id) => {
        setPacientes((prevPacientes) =>
            prevPacientes.map((paciente) =>
                paciente.id === id ? { ...paciente, digital: 1 } : paciente
            )
        );
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            <TextField
                label="Buscar por RUT o ficha"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                disabled={loading}
            />

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && (
                <>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>RUT</TableCell>
                                <TableCell>Ficha</TableCell>
                                <TableCell>Digitalizar Ficha</TableCell>
                                <TableCell>Ver Ficha</TableCell>
                                <TableCell>Agregar a Ficha</TableCell>
                            </TableRow>
                        </TableHead>
                            <TableBody>
                                {pacientes.map((paciente) => (
                                    <TableRow key={paciente.id}>
                                        <TableCell>{paciente.nombre}</TableCell>
                                        <TableCell>{paciente.rut}</TableCell>
                                        <TableCell>
                                            {paciente.ficha ? (
                                                paciente.ficha
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={<AddCircleOutlineIcon />}
                                                    size="small"
                                                    onClick={() => setOpenModal(paciente)}
                                                >
                                                    Asignar Ficha
                                                </Button>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {paciente.digital === 0 ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<CloudUploadIcon />}
                                                    size="small"
                                                    onClick={() => setOpenDigitalizar(paciente)}
                                                >
                                                    Digitalizar
                                                </Button>
                                            ) : (
                                               <></>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="info"
                                                startIcon={<VisibilityIcon />}
                                                size="small"
                                                onClick={() => handleViewFicha(paciente.ficha)}
                                                disabled={paciente.digital === 0 || paciente.digital === null}
                                            >
                                                Ver Ficha
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            {paciente.ficha && (
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    startIcon={<CloudUploadIcon />}
                                                    size="small"
                                                    onClick={() => setOpenModalAgregarPdf(paciente)}
                                                    disabled={paciente.digital === 0 || paciente.digital === null}
                                                >
                                                    Agregar PDF
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                    </Table>
                </TableContainer>
            
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    disabled={loading}
                />
                {openModalAgregarPdf && (
                    <ModalAgregarPdfFicha
                        open={Boolean(openModalAgregarPdf)}
                        onClose={() => setOpenModalAgregarPdf(null)}
                        paciente={openModalAgregarPdf}
                    />
                )}
                {openDigitalizar && (
                    <DigitalizarFicha 
                        open={Boolean(openDigitalizar)} 
                        onClose={() => setOpenDigitalizar(null)} 
                        paciente={openDigitalizar}
                        onFichaDigitalizada={handleFichaDigitalizada}
                    />
                )}
                {openModal && (
                    <ModalAgregarFicha 
                        open={Boolean(openModal)} 
                        onClose={() => setOpenModal(null)} 
                        paciente={openModal}
                        onFichaAsignada={handleFichaAsignada}
                    />
                )}
                </>
            )}
        </Paper>
    );
};

export default PacientesTable;
