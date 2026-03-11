import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  overflow: 'hidden',
  paddingBottom: theme.spacing(1),
}));

export const SectionContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
}));