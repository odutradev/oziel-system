import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const TableContainer = styled(Box)(() => ({ flexDirection: "column", display: "flex", width: "100%" }));
export const TableHeader = styled(Box)(({ theme }) => ({ justifyContent: "space-between", marginBottom: theme.spacing(2), alignItems: "center", display: "flex", width: "100%" }));