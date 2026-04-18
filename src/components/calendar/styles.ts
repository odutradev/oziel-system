import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import type { CalendarEventColor } from "./types";

export const CalendarContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    flexDirection: "column",
    overflow: "hidden",
    display: "flex",
    width: "100%"
}));

export const CalendarHeader = styled(Box)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: "space-between",
    padding: theme.spacing(2),
    alignItems: "center",
    display: "flex"
}));

export const WeekDaysRow = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.grey[50],
    borderBottom: `1px solid ${theme.palette.divider}`,
    gridTemplateColumns: "repeat(7, 1fr)",
    display: "grid"
}));

export const WeekDayCell = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    padding: theme.spacing(1),
    textAlign: "center",
    fontWeight: 600,
    fontSize: "0.875rem"
}));

export const DaysGrid = styled(Box)(({ theme }) => ({
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
    gridTemplateColumns: "repeat(7, 1fr)",
    display: "grid",
    "& > div": {
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRight: `1px solid ${theme.palette.divider}`
    }
}));

export const DayCell = styled(Box)<{ iscurrentmonth: number }>(({ theme, iscurrentmonth }) => ({
    backgroundColor: iscurrentmonth ? "transparent" : theme.palette.action.hover,
    flexDirection: "column",
    padding: theme.spacing(1),
    gap: theme.spacing(0.5),
    minHeight: "120px",
    display: "flex"
}));

export const DayNumber = styled(Typography)<{ iscurrentmonth: number; istoday: number }>(({ theme, iscurrentmonth, istoday }) => ({
    color: istoday ? theme.palette.primary.main : iscurrentmonth ? theme.palette.text.primary : theme.palette.text.disabled,
    marginBottom: theme.spacing(1),
    fontWeight: istoday ? 700 : 400,
    fontSize: "0.875rem"
}));

export const EventChip = styled(Box)<{ variantcolor: CalendarEventColor }>(({ theme, variantcolor }) => {
    const colors = {
        secondary: { light: theme.palette.secondary.light, dark: theme.palette.secondary.dark },
        warning: { light: theme.palette.warning.light, dark: theme.palette.warning.dark },
        success: { light: theme.palette.success.light, dark: theme.palette.success.dark },
        primary: { light: theme.palette.primary.light, dark: theme.palette.primary.dark },
        default: { light: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[200], dark: theme.palette.text.primary },
        error: { light: theme.palette.error.light, dark: theme.palette.error.dark },
        info: { light: theme.palette.info.light, dark: theme.palette.info.dark }
    };

    const selected = colors[variantcolor] || colors.default;

    return {
        backgroundColor: selected.light,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(0.5, 1),
        textOverflow: "ellipsis",
        color: selected.dark,
        whiteSpace: "nowrap",
        fontSize: "0.75rem",
        overflow: "hidden",
        cursor: "pointer",
        fontWeight: 500,
        "&:hover": {
            opacity: 0.9
        }
    };
});