export interface MeetingMinuteHistoryUserRef {
    email: string;
    name: string;
    _id: string;
}

export interface MeetingMinuteHistory {
    updatedBy: MeetingMinuteHistoryUserRef;
    updatedAt: Date | string;
    content: string;
}

export interface MeetingMinuteModelType {
    history: MeetingMinuteHistory[];
    updatedAt: Date | string;
    createdAt: Date | string;
    date: Date | string;
    title: string;
    _id: string;
}