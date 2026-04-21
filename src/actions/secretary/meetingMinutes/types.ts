import type { MeetingMinuteModelType } from "@utils/types/models/meetingMinute";
import type { PaginationMeta } from "@utils/types/action";

export interface CreateMeetingMinuteData {
    content: string;
    title: string;
    date: string | Date;
}

export interface UpdateMeetingMinuteData {
    content: string;
    title?: string;
    date?: string | Date;
}

export interface GetMeetingMinutesParams {
    limit?: number;
    page?: number;
}

export interface GetMeetingMinutesResponse {
    data: MeetingMinuteModelType[];
    meta: PaginationMeta;
}

export interface GetMeetingMinuteByIdResponse {
    data: MeetingMinuteModelType;
}