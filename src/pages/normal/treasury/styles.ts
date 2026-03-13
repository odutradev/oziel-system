import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PageContainer = styled('main')(({ theme }) => ({ flexDirection: "column", gap: theme.spacing(3), display: "flex", width: "100%" }));
export const HeaderControls = styled('section')(({ theme }) => ({ justifyContent: "space-between", marginBottom: theme.spacing(2), alignItems: "center", display: "flex", width: "100%" }));
export const MonthSelector = styled(Box)(({ theme }) => ({ gap: theme.spacing(2), alignItems: "center", display: "flex" }));