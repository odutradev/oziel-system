import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({ flexDirection: "column", padding: theme.spacing(1, 0), gap: theme.spacing(3), display: "flex", width: "100%" }));
export const FormGrid = styled(Box)(({ theme }) => ({ gridTemplateColumns: "repeat(2, 1fr)", gap: theme.spacing(3), display: "grid", width: "100%" }));