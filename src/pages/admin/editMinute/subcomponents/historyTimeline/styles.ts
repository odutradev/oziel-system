import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const TimelineContainer = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(3),
    display: "flex",
    width: "100%"
}));

export const HistoryCard = styled(Box)(({ theme }) => ({
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    flexDirection: "column",
    gap: theme.spacing(2),
    display: "flex",
    width: "100%"
}));

export const HistoryHeader = styled(Box)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: "space-between",
    paddingBottom: theme.spacing(1),
    alignItems: "center",
    display: "flex",
    width: "100%"
}));