import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({ flexDirection: "column", padding: theme.spacing(1, 0), gap: theme.spacing(3), display: "flex", width: "100%" }));
export const InfoBox = styled(Box)<{ variantcolor: "success" | "error" }>(({ theme, variantcolor }) => ({ backgroundColor: variantcolor === "success" ? theme.palette.success.light : theme.palette.error.light, color: variantcolor === "success" ? theme.palette.success.dark : theme.palette.error.dark, borderRadius: theme.shape.borderRadius, padding: theme.spacing(1.5), display: "flex", width: "100%" }));