import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import api from '@/api';

const DigitalizarFicha = ({ open, onClose, paciente, onFichaDigitalizada }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Debe seleccionar un archivo.");

            return;
        }

        setLoading(true);
        setError(null);

        try {
            await api.postDigitalizarFicha(paciente.id, file);
            onFichaDigitalizada(paciente.id);
            onClose();
        } catch (error) {
            setError("Error al subir la ficha. Inténtelo nuevamente.");
            console.error("Error al subir la ficha:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Digitalizar Ficha</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1"><strong>Nombre:</strong> {paciente?.nombre}</Typography>
                <Typography variant="subtitle1"><strong>RUT:</strong> {paciente?.rut}</Typography>
                <Typography variant="subtitle1"><strong>Ficha:</strong> {paciente?.ficha || "Sin ficha"}</Typography>

                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    style={{ marginBottom: 10 }}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" disabled={loading}>
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={loading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                    onClick={handleUpload}
                    disabled={loading}
                >
                    Subir Ficha
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DigitalizarFicha;