import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";

export const StatusChip = styled(Chip)<{ variantcolor: "success" | "warning" }>(({ theme, variantcolor }) => ({
    backgroundColor: variantcolor === "success" ? theme.palette.success.light : theme.palette.warning.light,
    color: variantcolor === "success" ? theme.palette.success.dark : theme.palette.warning.dark,
    fontWeight: 600,
    fontSize: "0.75rem"
}));

export const TypeChip = styled(Chip)<{ varianttype: "INCOME" | "EXPENSE" }>(({ theme, varianttype }) => ({
    backgroundColor: varianttype === "INCOME" ? theme.palette.success.main : theme.palette.error.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: "0.75rem"
}));