import React from 'react'
import TextField from '@mui/material/TextField'
import { useField } from 'formik'

const TextfieldWrapper = ({ name, ...otherProps}) => {

    const [field, mata] = useField(name)

    const configTextfield = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'standard'
    };
    
    if (mata && mata.touched && mata.error) {
        configTextfield.error = true;
        configTextfield.helperText = mata.error;
    }

    return (
        <TextField
            {...configTextfield}
            sx={{
                marginTop: '12px',
                marginBottom: '12px'
            }}
        />
    )
}

export default TextfieldWrapper