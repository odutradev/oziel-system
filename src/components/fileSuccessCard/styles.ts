import { Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SuccessCardContainer = styled(Card)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: (theme.shape.borderRadius as number) * 2,
  backgroundColor: theme.palette.background.paper,
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.main,
}));

export const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  width: '100%',
  flexWrap: 'wrap',
}));