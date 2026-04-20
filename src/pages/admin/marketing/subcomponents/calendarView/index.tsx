import { Typography, ListItemText, ListItemIcon, MenuItem, Menu } from "@mui/material";
import { RateReview, Delete, Send, Edit } from "@mui/icons-material";
import { useState } from "react";

import { LegendContainer, LegendItem, ColorBox, ViewContainer } from "./styles";
import Calendar from "@components/calendar";

import type { MarketingItemModelType, MarketingStatus } from "@actions/marketingRequests/types";
import type { CalendarEventColor, CalendarEvent } from "@components/calendar/types";
import type { CalendarViewProps } from "./types";

const LEGEND_ITEMS = [
    { label: "Aprovada / Concluída", color: "success.main" },
    { label: "Aguardando Aprovação", color: "warning.main" },
    { label: "Revisão Necessária", color: "error.main" },
    { label: "Planejada", color: "info.main" }
];

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

const CalendarView = ({ items, onEdit, onSendApproval, onDelete }: CalendarViewProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItem, setSelectedItem] = useState<MarketingItemModelType | null>(null);

    const calendarEvents: CalendarEvent<MarketingItemModelType>[] = items
        .filter((item) => item.plannedDate)
        .map((item) => ({
            color: getStatusColor(item.status),
            date: item.plannedDate as string,
            title: item.title,
            id: item._id,
            data: item
        }));

    const handleEventClick = (event: CalendarEvent<MarketingItemModelType>, target: HTMLElement) => {
        if (!event.data) return;
        setSelectedItem(event.data);
        setAnchorEl(target);
    };

    const handleCloseMenu = () => {
        setSelectedItem(null);
        setAnchorEl(null);
    };

    const handleAction = (action: "send" | "edit" | "delete") => {
        if (!selectedItem) return;

        if (action === "send" && selectedItem._id) onSendApproval(selectedItem._id);
        if (action === "edit") onEdit(selectedItem);
        if (action === "delete" && selectedItem._id) onDelete(selectedItem._id);

        handleCloseMenu();
    };

    const open = Boolean(anchorEl);

    return (
        <ViewContainer>
            <LegendContainer>
                {LEGEND_ITEMS.map((item) => (
                    <LegendItem key={item.label}>
                        <ColorBox sx={{ bgcolor: item.color }} />
                        <Typography variant="caption" color="textSecondary">
                            {item.label}
                        </Typography>
                    </LegendItem>
                ))}
            </LegendContainer>
            <Calendar events={calendarEvents} onEventClick={handleEventClick} />
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu} PaperProps={{ sx: { minWidth: 200 } }}>
                {(selectedItem?.status === "PLANNED" || selectedItem?.status === "REVISION_REQUIRED" || selectedItem?.status === "APPROVED") && (
                    <MenuItem onClick={() => handleAction("send")}>
                        <ListItemIcon>
                            <Send color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Enviar Aprovação</ListItemText>
                    </MenuItem>
                )}
                {selectedItem?.status === "WAITING_APPROVAL" && (
                    <MenuItem onClick={() => handleAction("edit")}>
                        <ListItemIcon>
                            <RateReview color="warning" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Revisar</ListItemText>
                    </MenuItem>
                )}
                {selectedItem?.status !== "COMPLETED" && selectedItem?.status !== "WAITING_APPROVAL" && (
                    <MenuItem onClick={() => handleAction("edit")}>
                        <ListItemIcon>
                            <Edit fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Editar</ListItemText>
                    </MenuItem>
                )}
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