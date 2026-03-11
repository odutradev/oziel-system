import { styled, Box } from '@mui/material';

export const Container = styled(Box)(() => ({
  width: '100%'
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3)
}));