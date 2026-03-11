import { styled } from '@mui/material/styles';
import { Box, Container, Link } from '@mui/material';

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

export const FooterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  cursor: 'pointer',
  '&:visited': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    textDecoration: 'underline',
  },
}));