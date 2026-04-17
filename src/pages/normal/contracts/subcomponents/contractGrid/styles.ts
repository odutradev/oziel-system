import { Box, Paper, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(3),
    display: "flex",
    flexGrow: 1,
    width: "100%"
}));

export const Header = styled(Box)(({ theme }) => ({
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "stretch",
        gap: theme.spacing(2)
    }
}));

export const HeaderInfo = styled(Box)(({ theme }) => ({
    gap: theme.spacing(1),
    alignItems: "baseline",
    display: "flex"
}));

export const Grid = styled(Box)(({ theme }) => ({
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(3),
    display: "grid",
    width: "100%",
    [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr"
    }
}));

export const Card = styled(Paper)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    transition: "all 0.2s ease-in-out",
    padding: theme.spacing(2.5),
    flexDirection: "column",
    gap: theme.spacing(2),
    display: "flex",
    cursor: "pointer",
    boxShadow: "none",
    "&:hover": {
        borderColor: theme.palette.primary.main,
        boxShadow: theme.shadows[2]
    }
}));

export const CardHeader = styled(Box)({
    justifyContent: "space-between",
    alignItems: "flex-start",
    display: "flex",
    width: "100%"
});

export const ChipsWrapper = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(1),
    gap: theme.spacing(1),
    flexWrap: "wrap",
    display: "flex"
}));

export const CardContent = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(2),
    display: "flex",
    flexGrow: 1
}));

export const InfoGrid = styled(Box)(({ theme }) => ({
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(2),
    display: "grid",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr"
    }
}));

export const InfoRow = styled(Box)(({ theme }) => ({
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(1.5),
    width: "100%",
    "& svg": {
        color: theme.palette.text.secondary,
        fontSize: "1.2rem"
    }
}));

export const InfoTextWrapper = styled(Box)({
    flexDirection: "column",
    display: "flex",
    flexGrow: 1
});

export const StatusChip = styled(Chip)<{ variantcolor: "success" | "warning" | "error" | "default" | "info" }>(({ theme, variantcolor }) => ({
    backgroundColor: variantcolor === "default" ? theme.palette.grey[300] : theme.palette[variantcolor].light,
    color: variantcolor === "default" ? theme.palette.grey[800] : theme.palette[variantcolor].dark,
    fontSize: "0.75rem",
    fontWeight: 600
}));

export const Footer = styled(Box)(({ theme }) => ({
    justifyContent: "center",
    paddingTop: theme.spacing(1),
    alignItems: "center",
    display: "flex",
    width: "100%"
}));