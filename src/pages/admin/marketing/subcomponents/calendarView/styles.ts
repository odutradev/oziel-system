import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ViewContainer = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(2),
    display: "flex",
    width: "100%"
}));

export const LegendContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    gap: theme.spacing(2),
    flexWrap: "wrap",
    display: "flex",
    width: "100%"
}));

export const LegendItem = styled(Box)(({ theme }) => ({
    alignItems: "center",
    gap: theme.spacing(1),
    display: "flex"
}));

export const ColorBox = styled(Box)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    height: 16,
    width: 16
}));