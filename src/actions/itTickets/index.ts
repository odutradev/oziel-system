import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { CreateTicketData, GetTicketsParams, GetTicketsResponse, TicketModelType, UpdateTicketData } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const getTickets = async (params?: GetTicketsParams): TypeOrError<GetTicketsResponse> => {
    try {
        hasAdminPosition();
        const response = await api.get("/it/tickets", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getTicketById = async (id: string): TypeOrError<TicketModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/it/tickets/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createTicket = async (data: CreateTicketData): TypeOrError<TicketModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/it/tickets", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateTicket = async (id: string, data: UpdateTicketData): TypeOrError<TicketModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/it/tickets/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteTicket = async (id: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/it/tickets/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};