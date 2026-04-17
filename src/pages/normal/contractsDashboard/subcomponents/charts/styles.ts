import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";

export const ChartsContainer = styled(Box)(({ theme }) => ({
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: theme.spacing(3),
    display: "grid",
    width: "100%",
    [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr"
    }
}));

export const ChartWrapper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    flexDirection: "column",
    minHeight: 350,
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: "none"
}));

export const ChartTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: 600
}));

export const ChartBody = styled(Box)({
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    width: "100%"
});