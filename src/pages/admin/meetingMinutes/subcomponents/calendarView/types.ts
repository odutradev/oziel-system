import type { MeetingMinuteModelType } from "@utils/types/models/meetingMinute";

export interface CalendarViewProps {
    onEdit: (item: MeetingMinuteModelType) => void;
    onDelete: (id: string) => void;
    items: MeetingMinuteModelType[];
}