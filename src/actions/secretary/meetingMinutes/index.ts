import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { CreateMeetingMinuteData, GetMeetingMinuteByIdResponse, GetMeetingMinutesParams, GetMeetingMinutesResponse, UpdateMeetingMinuteData } from "./types";
import type { MeetingMinuteModelType } from "@utils/types/models/meetingMinute";
import type { TypeOrError } from "@utils/types/action";

const BASE_URL = "/secretary/meeting-minutes";

export const getMeetingMinutes = async (params?: GetMeetingMinutesParams): TypeOrError<GetMeetingMinutesResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getMeetingMinuteById = async (id: string): TypeOrError<MeetingMinuteModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get<GetMeetingMinuteByIdResponse>(`${BASE_URL}/${id}`);
        return response.data?.data || response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createMeetingMinute = async (data: CreateMeetingMinuteData): TypeOrError<MeetingMinuteModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post(BASE_URL, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateMeetingMinute = async (id: string, data: UpdateMeetingMinuteData): TypeOrError<MeetingMinuteModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`${BASE_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteMeetingMinute = async (id: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export * from "./types";