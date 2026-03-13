import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    padding: theme.spacing(1, 0),
    gap: theme.spacing(2.5),
    display: "flex",
    width: "100%"
}));

export const FormRow = styled(Box)(({ theme }) => ({
    gap: theme.spacing(2.5),
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column"
    }
}));