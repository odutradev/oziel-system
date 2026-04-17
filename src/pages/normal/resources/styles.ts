import { styled } from "@mui/material/styles";

export const PageContainer = styled("main")(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(3),
    display: "flex",
    width: "100%"
}));