import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

export const StyledCard = styled(Card)({});

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export const InputRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

export const RecipientList = styled(Box)({
  maxHeight: 300,
  overflow: 'auto',
});