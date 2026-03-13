import type { EmailTemplateModelType } from "@utils/types/models/emailTemplate";

export interface CreateEmailTemplateData {
    trigger: string;
    subject: string;
    markdownBody: string;
    variables?: string[];
    description?: string;
    active?: boolean;
}

export type UpdateEmailTemplateData = Partial<Omit<EmailTemplateModelType, "_id" | "createdAt" | "updatedAt">>;

export interface EmailRecipient {
    email: string;
    variables?: Record<string, string>;
}

export interface BulkEmailData {
    trigger: string;
    recipients: EmailRecipient[];
    variables?: Record<string, string>;
}

export interface SendAllUsersEmailData {
    trigger: string;
    variables?: Record<string, string>;
}