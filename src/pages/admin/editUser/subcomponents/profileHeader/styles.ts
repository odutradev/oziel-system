import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
}));

export const AvatarWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 100,
  height: 100,
});

export const HiddenInput = styled('input')({
  display: 'none',
});