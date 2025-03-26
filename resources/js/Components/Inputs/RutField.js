import React, { useState } from 'react'
import { useField } from 'formik';
import Rut from '../Helpers/RutHelper'
import { TextField } from '@mui/material'

const RutField = ({ name, ...otherProps }) => {
    const [field, meta] = useField(name);
    const [rutValido, setRutValido] = useState(false)

    let errores = {
        error: false
    }

    const configTextfield = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'standard',
    };

    if (meta && meta.touched && meta.error)
    {
        errores.error = true
        errores.helperText = meta.error | ''
    }

    return (
        <Rut
            onValid={setRutValido}
            {...configTextfield}
        >
            <TextField
                {...configTextfield}
                sx={{ marginTop: '12px', marginBottom: '12px'}}
                {...errores}
            />
        </Rut>
    )
}

export default RutField