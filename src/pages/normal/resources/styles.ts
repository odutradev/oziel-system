import { styled } from "@mui/material/styles";

export const PageContainer = styled("main")(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(3),
    display: "flex",
    width: "100%"
}));

export const HeaderControls = styled("section")(({ theme }) => ({
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
    alignItems: "center",
    display: "flex",
    width: "100%"
}));