import type { ReactNode } from 'react';
import type { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';

export interface ToggleOption {
  value: string;
  label: ReactNode;
}

export interface ToggleGroupProps extends Omit<ToggleButtonGroupProps, 'children'> {
  options: ToggleOption[];
}