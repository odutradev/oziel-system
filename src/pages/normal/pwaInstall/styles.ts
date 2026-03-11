import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  padding: theme.spacing(3),
  gap: theme.spacing(4),
}));

export const InfoCard = styled(Paper)(({ theme }) => ({
  maxWidth: 600,
  width: '100%',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(3),
  borderRadius: (theme.shape.borderRadius as number) * 2,
  boxShadow: theme.shadows[4],
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

export const FeaturesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(3),
  width: '100%',
  marginTop: theme.spacing(2),
}));

export const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: theme.palette.action.selected,
  },
}));

export const Actions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  width: '100%',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));