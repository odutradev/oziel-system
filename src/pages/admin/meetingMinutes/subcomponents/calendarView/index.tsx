import { ListItemText, ListItemIcon, MenuItem, Menu } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";

import Calendar from "@components/calendar";
import { ViewContainer } from "./styles";

import type { MeetingMinuteModelType } from "@utils/types/models/meetingMinute";
import type { CalendarEvent } from "@components/calendar/types";
import type { CalendarViewProps } from "./types";

const CalendarView = ({ items, onEdit, onDelete }: CalendarViewProps) => {
    const [selectedItem, setSelectedItem] = useState<MeetingMinuteModelType | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const calendarEvents: CalendarEvent<MeetingMinuteModelType>[] = items.map((item) => ({
        color: "primary",
        date: item.date as string,
        title: item.title,
        id: item._id,
        data: item
    }));

    const handleEventClick = (event: CalendarEvent<MeetingMinuteModelType>, target: HTMLElement) => {
        if (!event.data) return;
        setSelectedItem(event.data);
        setAnchorEl(target);
    };

    const handleCloseMenu = () => {
        setSelectedItem(null);
        setAnchorEl(null);
    };

    const handleAction = (action: "edit" | "delete") => {
        if (!selectedItem) return;
        if (action === "edit") onEdit(selectedItem);
        if (action === "delete" && selectedItem._id) onDelete(selectedItem._id);
        handleCloseMenu();
    };

    const open = Boolean(anchorEl);

    return (
        <ViewContainer>
            <Calendar events={calendarEvents} onEventClick={handleEventClick} />
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu} PaperProps={{ sx: { minWidth: 160 } }}>
                <MenuItem onClick={() => handleAction("edit")}>
                    <ListItemIcon>
                        <Edit fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText>Visualizar / Editar</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleAction("delete")}>
                    <ListItemIcon>
                        <Delete color="error" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "error.main" }}>Excluir</ListItemText>
                </MenuItem>
            </Menu>
        </ViewContainer>
    );
};

export default CalendarView;