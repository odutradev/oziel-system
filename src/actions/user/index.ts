import { hasAdminPosition, manageActionError } from "@utils/functions/action";
import { setAuthToken } from "@utils/functions/headers";
import useUserStore from "@stores/user/index.ts";
import api from "@utils/functions/api.ts";

import type { AuthData, DeleteResponse, GetAllUsersParams, PasswordResetConfirmData, PasswordResetRequestData, PasswordResetResponse, PasswordResetVerifyData, ProfileImageUploadResponse, UpdateProfileData, UpdateUserByIdData } from "./types";
import type { PaginationOrError, TypeOrError } from "@utils/types/action";
import type { UserModelType } from "@utils/types/models/user";

export const signUp = async (data: AuthData): TypeOrError<UserModelType> => {
    try {
        const response = await api.post("/users/auth/register", data);
        setAuthToken(response.data?.token);
        return await getUser();
    } catch (error) {
        return manageActionError(error);
    }
};

export const signIn = async (data: AuthData): TypeOrError<UserModelType> => {
    try {
        const response = await api.post("/users/auth/login", data);
        setAuthToken(response.data?.token);
        return await getUser();
    } catch (error) {
        return manageActionError(error);
    }
};

export const requestPasswordReset = async (data: PasswordResetRequestData): TypeOrError<PasswordResetResponse> => {
    try {
        const response = await api.post("/users/auth/password-reset/request", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const verifyPasswordResetCode = async (data: PasswordResetVerifyData): TypeOrError<PasswordResetResponse> => {
    try {
        const response = await api.post("/users/auth/password-reset/verify", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const confirmPasswordReset = async (data: PasswordResetConfirmData): TypeOrError<PasswordResetResponse> => {
    try {
        const response = await api.post("/users/auth/password-reset/confirm", data);
        if (response.data?.token) setAuthToken(response.data.token);
        if (response.data?.user) useUserStore.getState().setUser(response.data.user);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getUser = async (): TypeOrError<UserModelType> => {
    try {
        const response = await api.get("/users/me/details");
        if (response.data) useUserStore.getState().setUser(response.data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateProfile = async (data: UpdateProfileData): TypeOrError<UserModelType> => {
    try {
        const response = await api.patch("/users/me/profile", data);
        if (response.data) useUserStore.getState().setUser(response.data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateProfileImage = async (image: File): TypeOrError<ProfileImageUploadResponse> => {
    try {
        const formData = new FormData();
        formData.append("image", image);
        
        const response = await api.patch("/users/me/profile/avatar", formData, { 
            headers: { "Content-Type": "multipart/form-data" } 
        });
        
        if (response.data?.user) useUserStore.getState().setUser(response.data.user);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getUserById = async (userID: string): TypeOrError<UserModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get(`/users/${userID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getAllUsers = async (params?: GetAllUsersParams): PaginationOrError<UserModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get("/users", { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateUserById = async (userID: string, data: UpdateUserByIdData): TypeOrError<UserModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch(`/users/${userID}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteUserById = async (userID: string): TypeOrError<DeleteResponse> => {
    try {
        hasAdminPosition();
        const response = await api.delete(`/users/${userID}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};