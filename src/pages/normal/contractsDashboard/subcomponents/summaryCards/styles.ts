import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";

export const CardsGrid = styled(Box)(({ theme }) => ({
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: theme.spacing(3),
    display: "grid",
    width: "100%"
}));

export const CardContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    flexDirection: "column",
    gap: theme.spacing(1),
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: "none"
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 600,
    fontSize: "0.875rem"
}));

export const CardValue = styled(Typography)<{ isprofit?: "true" }>(({ theme, isprofit }) => ({
    color: isprofit === "true" ? theme.palette.success.main : theme.palette.text.primary,
    fontWeight: 700,
    fontSize: "1.5rem"
}));