import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const SettingsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
}));

export const CardsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
  '& > *': {
    flex: 1,
  },
}));

export const SliderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const DateRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));
