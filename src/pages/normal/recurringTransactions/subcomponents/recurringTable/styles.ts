import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";

export const StatusChip = styled(Chip)<{ variantactive: boolean }>(({ theme, variantactive }) => ({ backgroundColor: variantactive ? theme.palette.success.light : theme.palette.error.light, color: variantactive ? theme.palette.success.dark : theme.palette.error.dark, fontWeight: 600, fontSize: "0.75rem" }));
export const TypeChip = styled(Chip)<{ varianttype: "INCOME" | "EXPENSE" }>(({ theme, varianttype }) => ({ backgroundColor: varianttype === "INCOME" ? theme.palette.success.main : theme.palette.error.main, color: theme.palette.common.white, fontWeight: 600, fontSize: "0.75rem" }));