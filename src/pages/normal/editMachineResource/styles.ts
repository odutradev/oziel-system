import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
  gap: theme.spacing(3),
  display: 'flex',
  width: '100%'
}));