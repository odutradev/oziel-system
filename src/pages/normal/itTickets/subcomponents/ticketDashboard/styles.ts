import { styled } from "@mui/material/styles";
import { Paper, Box } from "@mui/material";

export const DashboardCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    boxShadow: theme.shadows[2]
}));

export const IconWrapper = styled(Box)<{ variantcolor: "primary" | "error" | "warning" | "success" }>(({ theme, variantcolor }) => ({
    backgroundColor: theme.palette[variantcolor].light,
    color: theme.palette[variantcolor].dark,
    padding: theme.spacing(1.5),
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));