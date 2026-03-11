import type { TextFieldProps } from '@mui/material';

export type InputWithCounterProps = TextFieldProps & {
  maxLength: number;
};