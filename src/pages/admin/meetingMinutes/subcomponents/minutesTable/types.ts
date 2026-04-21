import type { Dispatch, SetStateAction } from "react";

import type { MeetingMinuteModelType } from "@utils/types/models/meetingMinute";

export interface MinutesTableProps {
    onEdit: (minute: MeetingMinuteModelType) => void;
    setLimit: Dispatch<SetStateAction<number>>;
    setPage: Dispatch<SetStateAction<number>>;
    minutes: MeetingMinuteModelType[];
    onDelete: (id: string) => void;
    onNew: () => void;
    loading: boolean;
    limit: number;
    total: number;
    page: number;
}