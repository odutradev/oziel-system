import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useState, useMemo } from "react";

import { CalendarContainer, CalendarHeader, WeekDaysRow, WeekDayCell, DaysGrid, DayCell, DayNumber, EventChip } from "./styles";

import type { CalendarProps } from "./types";

const WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const Calendar = <T,>({ events, onEventClick, onDateClick, currentDate = new Date() }: CalendarProps<T>) => {
    const [viewDate, setViewDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

    const calendarDays = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const days = [];

        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push({ date: new Date(year, month - 1, daysInPrevMonth - i), isCurrentMonth: false });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }

        const remainingCells = 42 - days.length;
        for (let i = 1; i <= remainingCells; i++) {
            days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
        }

        return days;
    }, [viewDate]);

    const handlePrevMonth = () => {
        setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    };

    const getEventsForDay = (date: Date) => {
        return events.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
        });
    };

    return (
        <CalendarContainer>
            <CalendarHeader>
                <IconButton onClick={handlePrevMonth} size="small">
                    <ChevronLeft />
                </IconButton>
                <Typography variant="h6" fontWeight={600}>
                    {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                </Typography>
                <IconButton onClick={handleNextMonth} size="small">
                    <ChevronRight />
                </IconButton>
            </CalendarHeader>
            <WeekDaysRow>
                {WEEK_DAYS.map((day) => (
                    <WeekDayCell key={day}>{day}</WeekDayCell>
                ))}
            </WeekDaysRow>
            <DaysGrid>
                {calendarDays.map((day, index) => {
                    const dayEvents = getEventsForDay(day.date);
                    return (
                        <DayCell key={index} iscurrentmonth={day.isCurrentMonth ? 1 : 0} onClick={() => onDateClick?.(day.date)}>
                            <DayNumber iscurrentmonth={day.isCurrentMonth ? 1 : 0} istoday={isToday(day.date) ? 1 : 0}>
                                {day.date.getDate()}
                            </DayNumber>
                            {dayEvents.map((event) => (
                                <EventChip
                                    key={event.id}
                                    variantcolor={event.color || "default"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onEventClick) onEventClick(event, e.currentTarget as HTMLElement);
                                    }}
                                >
                                    {event.title}
                                </EventChip>
                            ))}
                        </DayCell>
                    );
                })}
            </DaysGrid>
        </CalendarContainer>
    );
};

export default Calendar;