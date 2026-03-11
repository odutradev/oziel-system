import { styled, Card, CardContent, Typography, Box } from '@mui/material';

export const ChartCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

export const ChartContent = styled(CardContent)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '24px !important'
});

export const ChartHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3)
}));

export const ChartTitle = styled(Typography)({
  fontWeight: 600
});

export const ChartSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary
}));

export const ChartWrapper = styled(Box)({
  flexGrow: 1,
  minHeight: 350,
  width: '100%'
});

export const CenteredBox = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});