import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(3),
    display: "flex",
    width: "100%"
}));