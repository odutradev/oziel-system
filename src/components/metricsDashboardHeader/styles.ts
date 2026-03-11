import { styled, Box, Typography, ToggleButtonGroup, alpha } from '@mui/material';

const CONTROL_HEIGHT = 48;

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2)
  }
}));

export const TitleSection = styled(Box)({});

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  fontSize: '1.75rem',
  lineHeight: 1.2
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5)
}));

export const ControlsSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  height: CONTROL_HEIGHT,
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
  padding: 4,
  borderRadius: 12,
  gap: 4,
  border: 'none',
  width: '100%',
  display: 'flex',
  overflowX: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: 'auto'
  },
  '& .MuiToggleButton-root': {
    flex: 1,
    border: 'none',
    borderRadius: 8,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    padding: theme.spacing(0, 2),
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease-in-out',
    height: '100%',
    '&.Mui-selected': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
      '&:hover': {
        backgroundColor: theme.palette.background.paper
      }
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.text.primary, 0.04),
      color: theme.palette.text.primary
    }
  }
}));

export const CustomDateWrapper = styled(Box)(({ theme }) => ({
  minHeight: CONTROL_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(0, 1),
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  boxSizing: 'border-box',
  width: '100%',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0.5),
    padding: theme.spacing(0, 0.5),
  },
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    height: CONTROL_HEIGHT
  }
}));

export const DateSeparator = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontWeight: 500,
  flexShrink: 0
}));

export const dateInputStyles = {
  flex: 1,
  minWidth: 0,
  '& .MuiOutlinedInput-root': {
    fontSize: '0.875rem',
    height: 38,
    '& fieldset': { border: 'none' },
    '& input': {
      padding: '8px 4px',
      textAlign: 'center'
    }
  }
};