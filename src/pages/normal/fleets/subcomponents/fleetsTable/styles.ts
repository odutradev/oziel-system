import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";

export const StatusChip = styled(Chip)<{ variantactive: string }>(({ theme, variantactive }) => ({
    backgroundColor: variantactive === "true" ? theme.palette.success.light : theme.palette.error.light,
    color: variantactive === "true" ? theme.palette.success.dark : theme.palette.error.dark,
    fontWeight: 600,
    fontSize: "0.75rem"
}));