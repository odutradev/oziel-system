import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";

export const StatusChip = styled(Chip)<{ variantcolor: "success" | "warning" | "info" | "error" | "default" }>(({ theme, variantcolor }) => ({
    backgroundColor: variantcolor === "default" ? theme.palette.grey[300] : theme.palette[variantcolor].light,
    color: variantcolor === "default" ? theme.palette.grey[800] : theme.palette[variantcolor].dark,
    fontWeight: 600,
    fontSize: "0.75rem"
}));