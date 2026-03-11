import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const MenuContent = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  flexGrow: 1,
  scrollbarWidth: "thin",
  scrollbarColor: `${theme.palette.action.hover} transparent`,
  "&::-webkit-scrollbar": {
    width: theme.spacing(0.75),
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid transparent`,
    backgroundClip: "content-box",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));
