import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ControlsWrapper = styled("section")(({ theme }) => ({ justifyContent: "space-between", marginBottom: theme.spacing(2), alignItems: "center", display: "flex", width: "100%" }));
export const MonthSelector = styled(Box)(({ theme }) => ({ gap: theme.spacing(2), alignItems: "center", display: "flex" }));
export const ActionButtons = styled(Box)(({ theme }) => ({ gap: theme.spacing(2), alignItems: "center", display: "flex" }));