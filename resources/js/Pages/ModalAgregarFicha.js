import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import api from '@/api';

const ModalAgregarFicha = ({ open, onClose, paciente, onFichaAsignada }) => {
    const [ficha, setFicha] = useState('');

    const handleChange = (event) => {
        setFicha(event.target.value);
    };

    const handleGuardarFicha = async () => {
        if (!ficha) return;

        try {
            const data = await api.postCreateFicha({
                paciente_id: paciente.id,
                ficha: ficha
            })

            const digitalStatus = data?.data?.digital ?? 0;

            onFichaAsignada(paciente.id, ficha, digitalStatus);

            onClose(); // Cierra el modal después de asignar la ficha
        } catch (error) {
            console.error('Error al asignar la ficha:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Asignar Ficha</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1"><strong>Nombre:</strong> {paciente?.nombre}</Typography>
                <Typography variant="subtitle1"><strong>RUT:</strong> {paciente?.rut}</Typography>

                <TextField
                    label="Número de Ficha"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={ficha}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleGuardarFicha} color="primary" variant="contained">
                    Guardar Ficha
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalAgregarFicha;
