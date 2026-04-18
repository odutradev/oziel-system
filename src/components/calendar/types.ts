export type CalendarEventColor = "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";

export interface CalendarEvent<T = unknown> {
    id: string;
    title: string;
    date: Date | string;
    color?: CalendarEventColor;
    data?: T;
}

export interface CalendarProps<T = unknown> {
    onEventClick?: (event: CalendarEvent<T>, anchorEl: HTMLElement) => void;
    onDateClick?: (date: Date) => void;
    events: CalendarEvent<T>[];
    currentDate?: Date;
}