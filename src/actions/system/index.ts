import { manageActionError } from "@utils/functions/action";
import api from "@utils/functions/api.ts";

import type { TypeOrError } from "@utils/types/action";
import type { SystemResponse } from "./types";

export const pingSystem = async (): TypeOrError<SystemResponse> => {
    try {
        const response = await api.get("/health-check/ping");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const validateControlAccess = async (): TypeOrError<SystemResponse> => {
    try {
        const response = await api.get("/system/validate-access");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};