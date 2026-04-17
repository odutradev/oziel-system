import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PageContainer = styled("main")(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(3),
    display: "flex",
    width: "100%"
}));

export const ContentGrid = styled(Box)(({ theme }) => ({
    gridTemplateColumns: "1fr",
    gap: theme.spacing(3),
    display: "grid",
    width: "100%"
}));