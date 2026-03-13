export type PasswordResetModelType = {
    _id?: string;
    userID: string;
    email: string;
    code: string;
    expiresAt: Date | string;
    createdAt: Date | string;
    verified?: boolean;
    attempts?: number;
};