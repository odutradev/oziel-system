import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  gap: theme.spacing(1),
  flexDirection: "column",
  padding: theme.spacing(1),
  alignItems: "center",
  textAlign: "center",
  display: "flex",
  minWidth: 200
}));