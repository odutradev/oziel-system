import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: theme.zIndex.snackbar,
  padding: theme.spacing(2),
  maxWidth: '400px',
  width: 'calc(100% - 32px)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: (theme.shape.borderRadius as number) * 2,
  background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(12px)',
  boxShadow: theme.shadows[8],
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: theme.palette.secondary.main,
  },
  [theme.breakpoints.down('sm')]: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    left: theme.spacing(2),
    width: 'auto',
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  '& .MuiTypography-root': {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(4, 153, 200, 0.15)' : 'rgba(4, 153, 200, 0.1)',
  color: theme.palette.secondary.main,
}));

export const Actions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.5),
}));