import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
}));

export const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: (theme.shape.borderRadius as number) * 2,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}));

export const IconWrapper = styled(Box)<{ ownerState: { color: 'primary' | 'success' | 'info' } }>(({ theme, ownerState }) => ({
  width: 48,
  height: 48,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette[ownerState.color].light,
  color: theme.palette[ownerState.color].contrastText,
  opacity: 0.9,
  '& svg': {
    fontSize: 24,
  },
}));

export const ActionButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginTop: 'auto',
}));