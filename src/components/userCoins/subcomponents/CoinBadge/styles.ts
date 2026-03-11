import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== "transparent"
})<{ transparent?: boolean }>(({ theme, transparent }) => ({
  backgroundColor: transparent ? "transparent" : theme.palette.background.paper,
  border: transparent ? "none" : `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: transparent ? 0 : theme.spacing(0.5, 1.5),
  alignItems: "center",
  display: "flex",
  cursor: "default",
  gap: 8
}));