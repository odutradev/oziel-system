import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PageContainer = styled("main")(({ theme }) => ({ flexDirection: "column", gap: theme.spacing(3), display: "flex", width: "100%", "@media print": { gap: theme.spacing(1) } }));
export const PrintHiddenWrapper = styled(Box)({ "@media print": { display: "none !important" } });