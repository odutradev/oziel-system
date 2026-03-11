import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar';

import type { StyledAppBarProps } from '@components/layout/types';

export const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<StyledAppBarProps>(({ theme }) => ({
  backgroundColor: 'transparent !important',
  boxShadow: 'none !important',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));