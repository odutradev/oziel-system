export type EmailTemplateModelType = {
  _id?: string;
  trigger: string;
  subject: string;
  markdownBody: string;
  variables: string[];
  active: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  description?: string;
};