import { styled, Box, Typography } from '@mui/material';

export const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'height'
})<{ height?: string | number }>(({ theme, height }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: height || '100%',
  minHeight: 200,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  gap: theme.spacing(2),
  width: '100%',
  flexGrow: 1
}));

export const Message = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  fontWeight: 500
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  borderRadius: '50%',
  backgroundColor: theme.palette.action.hover,
  '& svg': {
    fontSize: 48,
    opacity: 0.5
  }
}));