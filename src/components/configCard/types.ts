import type { ReactNode } from 'react';
import type { PaperProps } from '@mui/material';

export interface ConfigCardProps extends Omit<PaperProps, 'title'> {
  title: string;
  description?: string;
  action?: ReactNode;
  active?: boolean;
  children?: ReactNode;
}