import { styled } from "@mui/material/styles";
import { Box, Chip } from "@mui/material";

export const TableContainer = styled(Box)(() => ({ width: "100%" }));
export const StatusChip = styled(Chip)<{ variantcolor: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" }>(({ theme, variantcolor }) => ({
    backgroundColor: theme.palette[variantcolor]?.light || theme.palette.grey[200],
    color: theme.palette[variantcolor]?.dark || theme.palette.text.primary,
    fontWeight: 600,
    fontSize: "0.75rem"
}));