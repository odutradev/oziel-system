import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateMeetingMinute, getMeetingMinuteById, createMeetingMinute } from "@actions/secretary/meetingMinutes";
import useAction from "@hooks/useAction";

import type { MeetingMinuteHistory } from "@utils/types/models/meetingMinute";
import type { EditMinuteFormData } from "../types";

const INITIAL_STATE: EditMinuteFormData = { title: "", date: "", content: "" };

const getSafeDate = (date?: string | Date) => {
    if (!date) return "";
    try {
        return new Date(date).toISOString().slice(0, 16);
    } catch {
        return "";
    }
};

const useEditMinute = (minuteID?: string) => {
    const [history, setHistory] = useState<MeetingMinuteHistory[]>([]);
    const [formData, setFormData] = useState<EditMinuteFormData>(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const fetchMinute = useCallback(async (id: string) => {
        setLoading(true);
        const response = await getMeetingMinuteById(id);
        if (response && !("error" in response)) {
            const data = response;
            const sortedHistory = [...(data.history || [])].sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
            const latestContent = sortedHistory[sortedHistory.length - 1]?.content || "";

            setFormData({
                date: getSafeDate(data.date),
                content: latestContent,
                title: data.title || ""
            });
            setHistory(sortedHistory);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (minuteID) {
            fetchMinute(minuteID);
        } else {
            setFormData({ ...INITIAL_STATE, date: getSafeDate(new Date()) });
            setHistory([]);
        }
    }, [minuteID, fetchMinute]);

    const handleChange = useCallback((field: keyof EditMinuteFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = useCallback(async () => {
        setSaving(true);
        await useAction({
            action: async () => {
                const payload = {
                    date: new Date(formData.date).toISOString(),
                    content: formData.content,
                    title: formData.title
                };
                if (minuteID) return await updateMeetingMinute(minuteID, payload);
                return await createMeetingMinute(payload);
            },
            toastMessages: { success: "Ata salva com sucesso", error: "Erro ao salvar", pending: "Salvando..." },
            callback: () => navigate("/dashboard/admin/secretary/minutes")
        });
        setSaving(false);
    }, [minuteID, formData, navigate]);

    return { handleChange, handleSave, formData, history, loading, saving };
};

export default useEditMinute;