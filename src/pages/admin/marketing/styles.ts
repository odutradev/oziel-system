import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PageContainer = styled("main")(({ theme }) => ({ flexDirection: "column", gap: theme.spacing(3), display: "flex", width: "100%" }));
export const TabPanelContainer = styled(Box)(({ theme }) => ({ paddingTop: theme.spacing(3), width: "100%" }));
export const HeaderActions = styled(Box)(({ theme }) => ({ justifyContent: "flex-end", marginBottom: theme.spacing(2), display: "flex", width: "100%" }));