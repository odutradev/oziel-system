import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(3),
    display: "flex",
    width: "100%"
}));

export const EditorWrapper = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    width: "100%",
    "& .w-md-editor": {
        boxShadow: "none",
        border: "none"
    }
}));