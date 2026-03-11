import { InputAdornment, CircularProgress, Tooltip } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

import { StyledTextField } from './styles';

import type { InputWithValidationProps } from './types';

const InputWithValidation = ({ validationStatus, successMessage, errorMessage, ...rest }: InputWithValidationProps) => {
  const getEndAdornment = () => {
    if (validationStatus === 'loading') return <CircularProgress size={20} color="inherit" />;
    
    if (validationStatus === 'valid') {
      return (
        <Tooltip title={successMessage || 'Válido'}>
          <CheckCircle sx={{ color: 'success.main' }} />
        </Tooltip>
      );
    }

    if (validationStatus === 'invalid') {
      return (
        <Tooltip title={errorMessage || 'Inválido'}>
          <Cancel color="error" />
        </Tooltip>
      );
    }

    return null;
  };

  const isError = validationStatus === 'invalid';

  return (
    <StyledTextField
      {...rest}
      error={isError}
      validationStatus={validationStatus}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {getEndAdornment()}
            </InputAdornment>
          ),
        }
      }}
    />
  );
};

export default InputWithValidation;