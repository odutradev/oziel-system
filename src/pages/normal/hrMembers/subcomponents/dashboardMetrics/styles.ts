import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: theme.spacing(3),
    width: "100%"
}));

export const MetricCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.5),
    borderRadius: (theme.shape.borderRadius as number) * 2,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: "none"
}));

export const Header = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2)
}));

export const IconWrapper = styled(Box)<{ customcolor: string }>(({ theme, customcolor }) => ({
    backgroundColor: `${customcolor}15`,
    color: customcolor,
    borderRadius: "50%",
    padding: theme.spacing(1.5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

export const ValueText = styled(Typography)(() => ({
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1
}));