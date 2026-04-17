import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const InfoContainer = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(3),
  display: 'flex'
}));

export const Row = styled(Box)(({ theme }) => ({
  gap: theme.spacing(2),
  display: 'flex',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));