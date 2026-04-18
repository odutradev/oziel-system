import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

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

export const ActionButtons = styled(Box)(({ theme }) => ({
    justifyContent: "flex-end",
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(3),
    gap: theme.spacing(2),
    display: "flex",
    width: "100%"
}));