import { styled } from "@mui/material/styles";
import { Box, Typography, Paper } from "@mui/material";

export const CardsContainer = styled('section')(({ theme }) => ({ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: theme.spacing(2), display: "grid", width: "100%" }));
export const CardWrapper = styled(Paper)(({ theme }) => ({ flexDirection: "column", padding: theme.spacing(2.5), display: "flex", width: "100%" }));
export const CardHeader = styled(Box)(({ theme }) => ({ justifyContent: "space-between", marginBottom: theme.spacing(1), alignItems: "center", display: "flex", width: "100%" }));
export const CardTitle = styled(Typography)(({ theme }) => ({ color: theme.palette.text.secondary, fontWeight: 600, fontSize: "0.875rem" }));
export const CardValue = styled(Typography)<{ variantcolor?: "success" | "error" | "neutral" }>(({ theme, variantcolor }) => ({ color: variantcolor === "success" ? theme.palette.success.main : variantcolor === "error" ? theme.palette.error.main : theme.palette.text.primary, fontWeight: 700, fontSize: "1.75rem" }));
export const CardSubtext = styled(Typography)(({ theme }) => ({ color: theme.palette.text.secondary, marginTop: theme.spacing(1), fontWeight: 500, fontSize: "0.75rem" }));