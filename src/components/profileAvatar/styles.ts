import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

export const StyledProfileAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    fontSize: '3rem',
    fontWeight: 800,
    height: 100,
    width: 100,
}));
