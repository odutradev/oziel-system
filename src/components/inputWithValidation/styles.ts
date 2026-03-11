import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

import type { ValidationStatus } from './types';

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'validationStatus',
})<{ validationStatus: ValidationStatus }>(({ theme, validationStatus }) => {
  const getBorderColor = () => {
    if (validationStatus === 'valid') return theme.palette.success.main;
    if (validationStatus === 'invalid') return theme.palette.error.main;
    return undefined;
  };

  return {
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: getBorderColor(),
      borderWidth: validationStatus !== 'idle' ? 2 : 1,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: getBorderColor(),
    },
  };
});
