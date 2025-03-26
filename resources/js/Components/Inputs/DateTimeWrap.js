import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useField, useFormikContext } from 'formik';

const DateTimeWrap = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { setFieldValue } = useFormikContext();

    const configTextfield = {
        ...props,
        label: label,
        format:"DD/MM/YYYY",
        name: field.name,
        value: field.value,
        //disableFuture:true,
    }

    let errores = {
        error: false
    }
    
    if (meta && meta.touched && meta.error) {
        errores.error = true;
        errores.helperText = meta.error;
    }

    return (
        <DatePicker
            {...configTextfield}
            onChange={(value) => setFieldValue(field.name, value)}
            sx={{
                marginTop: '12px', 
                marginBottom: '12px',
                width: "100%"
            }}
            componentsProps={{ textField: { variant: 'standard',  ...errores } }}
        />
    )
}

export default DateTimeWrap