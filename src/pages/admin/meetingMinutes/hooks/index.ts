import { useCallback, useEffect, useState, useMemo } from "react";

import { getMeetingMinutes, deleteMeetingMinute } from "@actions/secretary/meetingMinutes";
import useAction from "@hooks/useAction";

import type { MeetingMinuteModelType } from "@utils/types/models/meetingMinute";
import type { MinutesHookProps } from "../types";

const useMinutesHook = (): MinutesHookProps => {
    const [minutes, setMinutes] = useState<MeetingMinuteModelType[]>([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const fetchMinutesData = useCallback(async () => {
        setLoading(true);
        const response = await getMeetingMinutes({ limit, page });
        if (response && !("error" in response)) {
            setMinutes(response.data);
            setTotal(response.meta.total);
        }
        setLoading(false);
    }, [limit, page]);

    useEffect(() => {
        fetchMinutesData();
    }, [fetchMinutesData]);

    const handleDeleteMinute = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteMeetingMinute(id),
            toastMessages: { success: "Ata removida com sucesso", error: "Erro ao remover ata", pending: "Removendo..." },
            callback: fetchMinutesData
        });
    }, [fetchMinutesData]);

    return useMemo(() => ({
        handleDeleteMinute,
        setLimit,
        setPage,
        minutes,
        loading,
        limit,
        total,
        page
    }), [handleDeleteMinute, setLimit, setPage, minutes, loading, limit, total, page]);
};

export default useMinutesHook;