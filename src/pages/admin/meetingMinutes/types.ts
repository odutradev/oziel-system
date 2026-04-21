import type { Dispatch, SetStateAction } from "react";

import type { MeetingMinuteModelType } from "@utils/types/models/meetingMinute";

export interface MinutesHookProps {
    handleDeleteMinute: (id: string) => Promise<void>;
    setLimit: Dispatch<SetStateAction<number>>;
    setPage: Dispatch<SetStateAction<number>>;
    minutes: MeetingMinuteModelType[];
    loading: boolean;
    limit: number;
    total: number;
    page: number;
}