import { styled, Card, CardContent, Typography, TableContainer, TableCell, Box, Avatar, TableRow } from '@mui/material';

export const TableCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

export const CardContentArea = styled(CardContent)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '24px !important'
});

export const TableHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3)
}));

export const TableTitle = styled(Typography)({
  fontWeight: 600
});

export const TableSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary
}));

export const TableWrapper = styled(TableContainer)({
  flex: 1,
  overflow: 'auto'
});

export const HeaderCell = styled(TableCell)({});

export const BodyCell = styled(TableCell)({});

export const UserWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5)
}));

export const UserAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  fontSize: '0.875rem'
});

export const UserInfo = styled(Box)({});

export const UserName = styled(Typography)({
  fontWeight: 500
});

export const UserEmail = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary
}));

export const AmountText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.success.main
}));

export const EmptyRow = styled(TableRow)({});

export const EmptyText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4)
}));