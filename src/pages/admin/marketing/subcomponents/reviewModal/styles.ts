import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({ flexDirection: "column", padding: theme.spacing(1, 0), gap: theme.spacing(2.5), display: "flex", width: "100%" }));
export const ReadOnlySection = styled(Box)(({ theme }) => ({ backgroundColor: theme.palette.grey[50], borderRadius: theme.shape.borderRadius, padding: theme.spacing(2), border: `1px solid ${theme.palette.divider}` }));
export const ContentBlock = styled(Box)(({ theme }) => ({ whiteSpace: "pre-wrap", marginTop: theme.spacing(1), fontSize: "0.875rem" }));