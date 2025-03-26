import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

export default function AutoCompleteInput({
  label,
  options,
  value,
  onChange,
  optionLabel = 'nombre',
  optionValue = 'id',
  error,
  helperText,
  required = false,
}) {
  return (
    <Autocomplete
      fullWidth
      options={options || []}
      getOptionLabel={(option) => option?.[optionLabel] || ''}
      isOptionEqualToValue={(option, val) =>
        option?.[optionValue] === val?.[optionValue]
      }
      value={
        options?.find((o) => o?.[optionValue] === value) || null
      }
      onChange={(e, newValue) =>
        onChange(newValue ? newValue[optionValue] : '')
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          error={Boolean(error)}
          helperText={helperText}
        />
      )}
    />
  );
}