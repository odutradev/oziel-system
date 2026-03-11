import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const Container = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 2),
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    display: 'flex',
}));

export const Title = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    letterSpacing: '10px',
    fontWeight: '800',
    fontSize: '10rem',
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const HomeButton = styled(Button)({});
