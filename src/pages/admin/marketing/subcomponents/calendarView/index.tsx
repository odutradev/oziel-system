import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Edit, Send, RateReview } from "@mui/icons-material";
import { useState } from "react";

import Calendar from "@components/calendar";
import { ViewContainer } from "./styles";

import type { MarketingItemModelType, MarketingStatus } from "@actions/marketingRequests/types";
import type { CalendarEvent, CalendarEventColor } from "@components/calendar/types";
import type { CalendarViewProps } from "./types";

const getStatusColor = (status: MarketingStatus): CalendarEventColor => {
    const map: Record<MarketingStatus, CalendarEventColor> = {
        REVISION_REQUIRED: "error",
        WAITING_APPROVAL: "warning",
        COMPLETED: "success",
        APPROVED: "success",
        PLANNED: "info",
        DRAFT: "default"
    };
    return map[status] || "default";
};

const CalendarView = ({ items, onEdit, onSendApproval, onReview }: CalendarViewProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItem, setSelectedItem] = useState<MarketingItemModelType | null>(null);

    const calendarEvents: CalendarEvent<MarketingItemModelType>[] = items
        .filter((item) => item.plannedDate)
        .map((item) => ({
            id: item._id,
            title: item.title,
            date: item.plannedDate as string,
            color: getStatusColor(item.status),
            data: item
        }));

    const handleEventClick = (event: CalendarEvent<MarketingItemModelType>, target: HTMLElement) => {
        if (!event.data) return;
        setSelectedItem(event.data);
        setAnchorEl(target);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedItem(null);
    };

    const handleAction = (action: "send" | "review" | "edit") => {
        if (!selectedItem) return;

        if (action === "send" && selectedItem._id) onSendApproval(selectedItem._id);
        if (action === "review") onReview(selectedItem);
        if (action === "edit") onEdit(selectedItem);

        handleCloseMenu();
    };

    const open = Boolean(anchorEl);

    return (
        <ViewContainer>
            <Calendar events={calendarEvents} onEventClick={handleEventClick} />
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu} PaperProps={{ sx: { minWidth: 200 } }}>
                {(selectedItem?.status === "PLANNED" || selectedItem?.status === "REVISION_REQUIRED") && (
                    <MenuItem onClick={() => handleAction("send")}>
                        <ListItemIcon>
                            <Send color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Enviar Aprovação</ListItemText>
                    </MenuItem>
                )}
                {selectedItem?.status === "WAITING_APPROVAL" && (
                    <MenuItem onClick={() => handleAction("review")}>
                        <ListItemIcon>
                            <RateReview color="warning" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Revisar</ListItemText>
                    </MenuItem>
                )}
                {selectedItem?.status !== "APPROVED" && selectedItem?.status !== "COMPLETED" && (
                    <MenuItem onClick={() => handleAction("edit")}>
                        <ListItemIcon>
                            <Edit fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Editar</ListItemText>
                    </MenuItem>
                )}
            </Menu>
        </ViewContainer>
    );
};

export default CalendarView;