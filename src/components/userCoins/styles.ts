import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const CoinsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1.5),
  alignItems: "center",
  display: "flex",
  gap: 8,
  cursor: "default"
}));

export const TooltipContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
  minWidth: 200,
  textAlign: "center"
}));