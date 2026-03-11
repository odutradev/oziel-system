import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  borderRadius: (theme.shape.borderRadius as number) * 2,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  backgroundColor: theme.palette.background.paper,
}));

export const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});