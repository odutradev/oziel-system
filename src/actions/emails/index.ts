import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api.ts";

import type { BulkEmailData, CreateEmailTemplateData, GetEmailTemplatesParams, SendAllUsersEmailData, UpdateEmailTemplateData } from "./types";
import type { EmailTemplateModelType } from "@utils/types/models/emailTemplate";
import type { PaginationOrError, TypeOrError } from "@utils/types/action";

export const getEmailTemplates = async (params?: GetEmailTemplatesParams): PaginationOrError<EmailTemplateModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get("/communications/emails/templates", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getEmailTemplateByTrigger = async (trigger: string): TypeOrError<EmailTemplateModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/communications/emails/templates/${trigger}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createEmailTemplate = async (data: CreateEmailTemplateData): TypeOrError<EmailTemplateModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/communications/emails/templates", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateEmailTemplate = async (templateID: string, data: UpdateEmailTemplateData): TypeOrError<EmailTemplateModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/communications/emails/templates/${templateID}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteEmailTemplate = async (templateID: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/communications/emails/templates/${templateID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const sendBulkEmail = async (data: BulkEmailData): TypeOrError<{ success: boolean; sent: number }> => {
    try {
        hasAdminPosition();
        const response = await api.post("/communications/emails/deliveries/bulk", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const sendEmailToAllUsers = async (data: SendAllUsersEmailData): TypeOrError<{ success: boolean; sent: number }> => {
    try {
        hasAdminPosition();
        const response = await api.post("/communications/emails/deliveries/broadcast", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const seedInitialTemplates = async (): TypeOrError<{ success: boolean; created: number }> => {
    try {
        hasAdminPosition();
        const response = await api.post("/communications/emails/templates/seed-initial");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};