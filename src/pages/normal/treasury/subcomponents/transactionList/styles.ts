import { styled } from "@mui/material/styles";
import { Box, Chip, TableContainer } from "@mui/material";

export const ListWrapper = styled(TableContainer)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    width: "100%",
    boxShadow: theme.shadows[1]
}));

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

export const ActionGroup = styled(Box)(({ theme }) => ({
    gap: theme.spacing(1),
    display: "flex"
}));