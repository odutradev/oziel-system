export type EmailTemplateModelType = {
    _id?: string;
    trigger: "PASSWORD_RESET" | "PASSWORD_CHANGED";
    subject: string;
    markdownBody: string;
    variables: string[];
    active: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    description?: string;
};