export interface EmailTemplateModelType {
    _id?: string;
    trigger: string;
    subject: string;
    markdownBody: string;
    variables: string[];
    description?: string;
    active: boolean;
    createdAt?: Date;
    lastUpdate?: Date;
}

export interface CreateEmailTemplateData {
    trigger: string;
    subject: string;
    markdownBody: string;
    variables?: string[];
    description?: string;
    active?: boolean;
}

export type UpdateEmailTemplateData = Partial<Omit<EmailTemplateModelType, "_id" | "createdAt" | "lastUpdate">>;

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
