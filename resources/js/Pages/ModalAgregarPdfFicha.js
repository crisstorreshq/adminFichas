import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Input } from '@mui/material';
import api from '@/api';

const ModalAgregarPdfFicha = ({ open, onClose, paciente }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert('Debes seleccionar un archivo PDF.');

        setLoading(true);
        try {
            await api.postAgregarPdfFicha(paciente.id, file);
            alert('PDF agregado a la ficha correctamente.');
            onClose();
        } catch (error) {
            console.error('Error al agregar el PDF a la ficha:', error);
            alert('Hubo un error al agregar el PDF.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Agregar PDF a Ficha</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1"><strong>Nombre:</strong> {paciente?.nombre}</Typography>
                <Typography variant="subtitle1"><strong>RUT:</strong> {paciente?.rut}</Typography>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    style={{ marginBottom: 10 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" disabled={loading}>Cancelar</Button>
                <Button onClick={handleUpload} color="primary" variant="contained" disabled={loading}>
                    {loading ? 'Subiendo...' : 'Subir PDF'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalAgregarPdfFicha;
