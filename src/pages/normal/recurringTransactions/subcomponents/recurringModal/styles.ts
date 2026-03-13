import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({ flexDirection: "column", padding: theme.spacing(1, 0), gap: theme.spacing(3), display: "flex", width: "100%" }));
export const FormRow = styled(Box)(({ theme }) => ({ gap: theme.spacing(3), display: "flex", width: "100%", [theme.breakpoints.down("sm")]: { flexDirection: "column" } }));
export const TypeToggleWrapper = styled(Box)<{ varianttype: string }>(({ theme, varianttype }) => ({ width: "100%", "& .MuiToggleButtonGroup-root": { "& .MuiToggleButton-root.Mui-selected": { backgroundColor: varianttype === "INCOME" ? theme.palette.success.main : theme.palette.error.main, borderColor: varianttype === "INCOME" ? theme.palette.success.main : theme.palette.error.main, color: theme.palette.common.white, "&:hover": { backgroundColor: varianttype === "INCOME" ? theme.palette.success.dark : theme.palette.error.dark } } } }));