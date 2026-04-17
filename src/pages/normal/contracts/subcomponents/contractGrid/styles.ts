import { Box, Paper, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(3),
    display: "flex",
    width: "100%"
}));

export const Header = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    justifyContent: "space-between",
    padding: theme.spacing(2),
    alignItems: "center",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "stretch",
        gap: theme.spacing(2)
    }
}));

export const HeaderInfo = styled(Box)(({ theme }) => ({
    gap: theme.spacing(2),
    alignItems: "center",
    display: "flex"
}));

export const Grid = styled(Box)(({ theme }) => ({
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: theme.spacing(3),
    display: "grid"
}));

export const Card = styled(Paper)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    transition: "all 0.2s ease-in-out",
    padding: theme.spacing(2.5),
    flexDirection: "column",
    gap: theme.spacing(2),
    display: "flex",
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

export const CardContent = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(1),
    display: "flex",
    flexGrow: 1
}));

export const InfoRow = styled(Box)({
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    width: "100%"
});

export const CardActions = styled(Box)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    justifyContent: "flex-end",
    paddingTop: theme.spacing(1),
    gap: theme.spacing(1),
    alignItems: "center",
    display: "flex"
}));

export const StatusChip = styled(Chip)<{ variantcolor: "success" | "warning" | "error" | "default" | "info" }>(({ theme, variantcolor }) => ({
    backgroundColor: variantcolor === "default" ? theme.palette.grey[300] : theme.palette[variantcolor].light,
    color: variantcolor === "default" ? theme.palette.grey[800] : theme.palette[variantcolor].dark,
    fontSize: "0.75rem",
    fontWeight: 600
}));

export const Footer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    justifyContent: "center",
    padding: theme.spacing(2),
    display: "flex"
}));