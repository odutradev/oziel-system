import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PageContainer = styled("main")(({ theme }) => ({ flexDirection: "column", gap: theme.spacing(4), display: "flex", width: "100%" }));
export const SectionContainer = styled(Box)(() => ({ flexDirection: "column", display: "flex", width: "100%" }));