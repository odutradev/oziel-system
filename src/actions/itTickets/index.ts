import { manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api";

import type { DashboardMetricsResponse, GetTicketsResponse, UpdateTicketData, CreateTicketData, GetTicketsParams, TicketModelType } from "./types";
import type { TypeOrError } from "@utils/types/action";

export const getTicketsDashboard = async (): TypeOrError<DashboardMetricsResponse> => {
    try {
        const response = await api.get("/it/tickets/dashboard");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getTickets = async (params?: GetTicketsParams): TypeOrError<GetTicketsResponse> => {
    try {
        const response = await api.get("/it/tickets", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getTicketById = async (id: string): TypeOrError<TicketModelType> => {
    try {
        const response = await api.get(`/it/tickets/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createTicket = async (data: CreateTicketData): TypeOrError<TicketModelType> => {
    try {
        const response = await api.post("/it/tickets", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateTicket = async (id: string, data: UpdateTicketData): TypeOrError<TicketModelType> => {
    try {
        const response = await api.patch(`/it/tickets/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteTicket = async (id: string): TypeOrError<{ success: boolean }> => {
    try {
        const response = await api.delete(`/it/tickets/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};