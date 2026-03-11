import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)(() => ({
  width: "100%",
}));

export const HeaderActions = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));