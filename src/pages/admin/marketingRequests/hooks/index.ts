import { useState, useEffect, useCallback, useMemo } from "react";

import { getMarketingRequests, createMarketingRequest, updateMarketingRequest, sendMarketingRequestForApproval, reviewMarketingRequest } from "@actions/marketingRequests";
import useAction from "@hooks/useAction";

import type { MarketingRequestModelType, CreateMarketingRequestData, UpdateMarketingRequestData, ReviewMarketingRequestData } from "@actions/marketingRequests/types";
import type { MarketingRequestsHookProps, RequestFormData, ReviewFormData } from "../types";

const INITIAL_FORM_DATA: RequestFormData = {
    description: "",
    title: ""
};

const INITIAL_REVIEW_DATA: ReviewFormData = {
    approved: false,
    _id: ""
};

const useMarketingRequestsHook = (): MarketingRequestsHookProps => {
    const [reviewData, setReviewData] = useState<ReviewFormData>(INITIAL_REVIEW_DATA);
    const [formData, setFormData] = useState<RequestFormData>(INITIAL_FORM_DATA);
    const [requests, setRequests] = useState<MarketingRequestModelType[]>([]);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchRequests = useCallback(async () => {
        setLoading(true);
        const response = await getMarketingRequests({ limit: 1000 });
        if (response && !("error" in response)) setRequests(response.data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleOpenModal = useCallback((request?: MarketingRequestModelType) => {
        if (request) {
            setFormData({
                _id: request._id,
                title: request.title,
                description: request.description,
                strategy: (request as unknown as RequestFormData).strategy || "",
                content: (request as unknown as RequestFormData).content || "",
                results: (request as unknown as RequestFormData).results || "",
            });
        } else {
            setFormData(INITIAL_FORM_DATA);
        }
        setModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
        setFormData(INITIAL_FORM_DATA);
    }, []);

    const handleOpenReview = useCallback((request: MarketingRequestModelType) => {
        setReviewData({ _id: request._id, approved: true, feedbackNotes: "" });
        setReviewOpen(true);
    }, []);

    const handleCloseReview = useCallback(() => {
        setReviewOpen(false);
        setReviewData(INITIAL_REVIEW_DATA);
    }, []);

    const handleFormChange = useCallback((field: keyof RequestFormData, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleReviewChange = useCallback((field: keyof ReviewFormData, value: unknown) => {
        setReviewData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = useCallback(async () => {
        if (!formData.title || !formData.description) return;

        const isUpdate = !!formData._id;
        const payload = isUpdate
            ? { title: formData.title, description: formData.description, strategy: formData.strategy, content: formData.content, results: formData.results } as UpdateMarketingRequestData
            : { title: formData.title, description: formData.description } as CreateMarketingRequestData;

        await useAction({
            action: async () => isUpdate ? await updateMarketingRequest(formData._id as string, payload as UpdateMarketingRequestData) : await createMarketingRequest(payload as CreateMarketingRequestData),
            toastMessages: { success: "Solicitação salva com sucesso", error: "Erro ao salvar solicitação", pending: "Salvando..." },
            callback: () => {
                fetchRequests();
                handleCloseModal();
            }
        });
    }, [formData, fetchRequests, handleCloseModal]);

    const handleSendApproval = useCallback(async (id: string) => {
        await useAction({
            action: async () => await sendMarketingRequestForApproval(id),
            toastMessages: { success: "Enviado para aprovação", error: "Erro ao enviar", pending: "Enviando..." },
            callback: fetchRequests
        });
    }, [fetchRequests]);

    const handleReviewSave = useCallback(async () => {
        if (!reviewData._id) return;

        const payload: ReviewMarketingRequestData = {
            approved: reviewData.approved,
            feedbackNotes: reviewData.feedbackNotes
        };

        await useAction({
            action: async () => await reviewMarketingRequest(reviewData._id, payload),
            toastMessages: { success: "Revisão concluída", error: "Erro na revisão", pending: "Processando..." },
            callback: () => {
                fetchRequests();
                handleCloseReview();
            }
        });
    }, [reviewData, fetchRequests, handleCloseReview]);

    return useMemo(() => ({
        handleSendApproval,
        handleReviewChange,
        handleCloseReview,
        handleCloseModal,
        handleReviewSave,
        handleOpenReview,
        handleFormChange,
        handleOpenModal,
        handleSave,
        reviewData,
        reviewOpen,
        modalOpen,
        formData,
        requests,
        loading
    }), [handleSendApproval, handleReviewChange, handleCloseReview, handleCloseModal, handleReviewSave, handleOpenReview, handleFormChange, handleOpenModal, handleSave, reviewData, reviewOpen, modalOpen, formData, requests, loading]);
};

export default useMarketingRequestsHook;