// resources/js/Components/Form/TextInput.jsx
import React from 'react';
import { TextField } from '@mui/material';

export default function TextInput({
  label,
  value,
  onChange,
  type = 'text',
  error,
  helperText,
  multiline = false,
  rows = 3,
  required = false,
}) {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={helperText}
      multiline={multiline}
      minRows={multiline ? rows : undefined}
      required={required}
    />
  );
}
