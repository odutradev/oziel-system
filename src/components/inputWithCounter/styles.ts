import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const CounterText = styled(Typography)<{ color: string }>(({ theme, color }) => ({
  color: color.includes('.') ? color.split('.').reduce((o: any, i) => o[i], theme.palette) : color,
  fontSize: '0.75rem',
  fontWeight: 700,
  transition: 'color 0.3s ease',
  userSelect: 'none',
}));
