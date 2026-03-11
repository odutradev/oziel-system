import { ReactNode } from 'react';
import type { PaperProps } from '@mui/material';

export interface EditSectionProps extends PaperProps {
  children: ReactNode;
  title?: string;
  headerAction?: ReactNode;
}