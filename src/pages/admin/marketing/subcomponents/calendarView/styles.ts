import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ViewContainer = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(2),
    display: "flex",
    width: "100%"
}));