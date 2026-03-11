export interface AuthData {
    password: string;
    email: string;
    name?: string;
}

export interface PasswordResetRequestData {
    email: string;
}

export interface PasswordResetVerifyData {
    email: string;
    code: string;
}

export interface PasswordResetConfirmData {
    email: string;
    code: string;
    newPassword: string;
}

export interface UpdateProfileData {
    name?: string;
    description?: string;
    cpfOrRg?: string;
}

export interface GetAllUsersParams {
    page?: number;
    limit?: number;
    returnType?: 'full' | 'minimum';
}

export interface UpdateUserByIdData {
    name?: string;
    description?: string;
    status?: 'loggedIn' | 'registered' | 'blocked';
    coins?: number;
    cpfOrRg?: string;
}

export interface PasswordResetResponse {
    success: boolean;
    message: string;
    expiresIn?: number;
    token?: string;
    user?: unknown;
}

export interface ProfileImageUploadResponse {
    url: string;
    user: unknown;
    compression: {
        originalSize: number;
        compressedSize: number;
        compressionRatio: string;
        savedBytes: number;
    };
}

export interface DeleteResponse {
    delete: boolean;
}