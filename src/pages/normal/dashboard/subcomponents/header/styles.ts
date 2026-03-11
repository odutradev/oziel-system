import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(1, 0),
}));