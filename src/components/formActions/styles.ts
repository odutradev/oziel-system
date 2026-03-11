import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import type { ActionAlignment } from './types';

export const Container = styled(Box, { shouldForwardProp: (prop) => prop !== 'align' })<{ align: ActionAlignment }>(({ theme, align }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  width: '100%',
  marginTop: theme.spacing(2),
  justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
}));