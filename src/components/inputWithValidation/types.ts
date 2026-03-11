import type { TextFieldProps } from '@mui/material';

export type ValidationStatus = 'idle' | 'loading' | 'valid' | 'invalid';

export type InputWithValidationProps = TextFieldProps & {
  validationStatus: ValidationStatus;
  successMessage?: string;
  errorMessage?: string;
};