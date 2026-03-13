import { styled } from "@mui/material/styles";
import { Box, Paper, LinearProgress, Button } from "@mui/material";

export const VaultsGrid = styled("section")(({ theme }) => ({ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: theme.spacing(3), display: "grid", width: "100%" }));
export const VaultCard = styled(Paper)(({ theme }) => ({ flexDirection: "column", display: "flex", height: "100%", overflow: "hidden" }));
export const CardHeader = styled(Box)(({ theme }) => ({ borderBottom: `1px solid ${theme.palette.divider}`, justifyContent: "space-between", padding: theme.spacing(2), alignItems: "center", display: "flex" }));
export const CardBody = styled(Box)(({ theme }) => ({ flexDirection: "column", padding: theme.spacing(3, 2), flexGrow: 1, display: "flex" }));
export const CardFooter = styled(Box)(({ theme }) => ({ backgroundColor: theme.palette.action.hover, padding: theme.spacing(2) }));
export const ProgressWrapper = styled(Box)(({ theme }) => ({ marginTop: theme.spacing(3), width: "100%" }));
export const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({ borderRadius: theme.shape.borderRadius, height: 8, backgroundColor: theme.palette.action.selected, "& .MuiLinearProgress-bar": { borderRadius: theme.shape.borderRadius, backgroundColor: theme.palette.primary.main } }));
export const ActionGroup = styled(Box)(({ theme }) => ({ gap: theme.spacing(2), display: "flex", width: "100%" }));