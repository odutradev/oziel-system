import { styled, Grid, Card, CardContent, Typography, Box, alpha } from '@mui/material';

export const GridContainer = styled(Grid)({});

export const GridItem = styled(Grid)({});

export const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6]
  }
}));

export const CardContentArea = styled(CardContent)({});

export const IconWrapper = styled(Box)<{ headerColor: string }>(({ theme, headerColor }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    color: headerColor
  }
}));

export const StyledIconWrapper = styled(Box)<{ color: string }>(({ theme, color }) => ({
  padding: theme.spacing(1.5),
  borderRadius: (theme.shape.borderRadius as number) * 2,
  backgroundColor: alpha(color, 0.1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const ValueText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(0.5)
}));

export const LabelText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary
}));

export const SubValueText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'colorCode'
})<{ colorCode: string }>(({ theme, colorCode }) => ({
  color: colorCode,
  fontWeight: 500,
  marginTop: theme.spacing(1),
  display: 'block'
}));