import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export const PageContainer = styled(Container)(() => ({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ContentCard = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: (theme.shape.borderRadius as number) * 2,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

export const FormContainer = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: '100%',
}));

export const PinContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
  margin: theme.spacing(3, 0),
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 500,
  '&:visited': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    textDecoration: 'underline',
  },
}));