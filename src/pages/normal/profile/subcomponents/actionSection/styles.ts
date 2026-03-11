import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ActionContainer = styled(Box)(({}) => ({
  flexDirection: 'column',
  display: 'flex',
  width: '100%',
}));

export const DangerItem = styled(Box)(({ theme }) => ({
  justifyContent: 'space-between',
  padding: theme.spacing(2, 0),
  borderTop: `1px solid ${theme.palette.divider}`,
  alignItems: 'center',
  display: 'flex',
  width: '100%',
  gap: theme.spacing(2),
  '&:first-of-type': {
    borderTop: 'none',
    paddingTop: 0,
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

export const ItemInfo = styled(Box)({
  flexDirection: 'column',
  display: 'flex',
  flex: 1,
});