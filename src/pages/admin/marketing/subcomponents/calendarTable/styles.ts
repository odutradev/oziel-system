import { styled } from "@mui/material/styles";
import { Box, Chip } from "@mui/material";

export const TableContainer = styled(Box)(() => ({ width: "100%" }));

export const StatusChip = styled(Chip)<{ variantcolor: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" }>(({ theme, variantcolor }) => {
    const colors = {
        default: { light: theme.palette.grey[200], dark: theme.palette.text.primary },
        secondary: theme.palette.secondary,
        warning: theme.palette.warning,
        primary: theme.palette.primary,
        success: theme.palette.success,
        error: theme.palette.error,
        info: theme.palette.info
    };

    const selected = colors[variantcolor] || colors.default;

    return {
        backgroundColor: selected.light,
        color: selected.dark,
        fontSize: "0.75rem",
        fontWeight: 600
    };
});