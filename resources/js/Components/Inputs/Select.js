import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useField, useFormikContext } from 'formik';

const SelectWrap = ({ name, ...props }) => {

    const { setFieldValue, handleBlur } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (evt, value) => {
        setFieldValue(name, value);
    };

    const configSelect = {
        ...field,
        ...props,
        fullWidth: true,
        onOpen: handleBlur(name),
        blurOnSelect: false,
        onChange: handleChange,
    };

    let errores = {
        error: false
    }
    
    if (meta && meta.touched && meta.error) {
        errores.error = true;
        errores.helperText = meta.error;
    }

    return (
        <Autocomplete
            {...configSelect}
            renderInput={
                (params) => <TextField 
                    {...params} 
                    label={props.label} 
                    variant='standard' 
                    sx={{ marginTop: '12px', marginBottom: '12px' }}
                    {... errores}
                    />
                }
        />
    )
}

export default SelectWrap