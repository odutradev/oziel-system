import { styled } from "@mui/material/styles";

export const PageContainer = styled("main")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    flexDirection: "column",
    padding: theme.spacing(3),
    gap: theme.spacing(4),
    display: "flex",
    width: "100%"
}));