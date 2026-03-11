import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

export const StyledCard = styled(Card)({});

export const InputRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));