import { hasAdminPosition, manageActionError } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { EmailTemplateModelType, CreateEmailTemplateData, UpdateEmailTemplateData, BulkEmailData, SendAllUsersEmailData } from './types';
import type { TypeOrError, PaginationOrError } from '@utils/types/action';

export const getEmailTemplates = async (): PaginationOrError<EmailTemplateModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get("/emails/templates");
        return {
            data: response.data.templates,
            meta: response.data.meta
        };
    } catch (error) {
        return manageActionError(error);
    }
};

export const getEmailTemplateByTrigger = async (trigger: string): TypeOrError<EmailTemplateModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/emails/templates/${trigger}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createEmailTemplate = async (data: CreateEmailTemplateData): TypeOrError<EmailTemplateModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/emails/templates/create", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateEmailTemplate = async (templateID: string, data: UpdateEmailTemplateData): TypeOrError<EmailTemplateModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/emails/templates/${templateID}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteEmailTemplate = async (templateID: string): TypeOrError<{ success: boolean }> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/emails/templates/${templateID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const sendBulkEmail = async (data: BulkEmailData): TypeOrError<{ success: boolean; sent: number }> => {
    try {
        hasAdminPosition();
        const response = await api.post("/emails/send/bulk", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const sendEmailToAllUsers = async (data: SendAllUsersEmailData): TypeOrError<{ success: boolean; sent: number }> => {
    try {
        hasAdminPosition();
        const response = await api.post("/emails/send/all-users", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const seedInitialTemplates = async (): TypeOrError<{ success: boolean; created: number }> => {
    try {
        hasAdminPosition();
        const response = await api.post("/emails/seed/initial-templates");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};
