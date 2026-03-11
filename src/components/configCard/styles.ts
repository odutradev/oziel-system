import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

export const CardContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
  backgroundColor: active ? `${theme.palette.primary.main}08` : 'transparent',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const Header = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const TextContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});