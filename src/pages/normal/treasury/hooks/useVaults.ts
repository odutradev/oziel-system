import { useState, useEffect, useCallback, useMemo } from "react";

import { getVaults, createVault, updateVault, processVaultTransaction } from "@actions/vaults";
import usePagination from "@hooks/usePagination";
import useAction from "@hooks/useAction";

import type { VaultsHookProps, VaultFormData, VaultTransactionFormData } from "../types";
import type { VaultModelType } from "@utils/types/models/vault";

const INITIAL_VAULT_FORM: VaultFormData = { name: "", goal: 0, description: "" };
const INITIAL_TRANS_FORM: VaultTransactionFormData = { vaultId: "", amount: 0, type: "DEPOSIT", description: "" };

const useVaultsHook = (): VaultsHookProps => {
    const [vaultFormData, setVaultFormData] = useState<VaultFormData>(INITIAL_VAULT_FORM);
    const [transactionFormData, setTransactionFormData] = useState<VaultTransactionFormData>(INITIAL_TRANS_FORM);
    const [vaultModalOpen, setVaultModalOpen] = useState(false);
    const [transactionModalOpen, setTransactionModalOpen] = useState(false);

    const fetchVaults = useCallback(async (page: number, limit: number) => {
        return await getVaults({ page, limit });
    }, []);

    const { data: vaults, meta, loading, refresh, setPage, setLimit } = usePagination<VaultModelType>(fetchVaults);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handlePaginationChange = useCallback((pagination: { currentPage: number; rows: number }) => {
        setPage(pagination.currentPage);
        setLimit(pagination.rows);
    }, [setPage, setLimit]);

    const handleOpenVaultModal = useCallback((vault?: VaultModelType) => {
        if (vault) setVaultFormData({ _id: vault._id, name: vault.name, goal: vault.goal ?? 0, description: vault.description ?? "" });
        else setVaultFormData(INITIAL_VAULT_FORM);
        setVaultModalOpen(true);
    }, []);

    const handleCloseVaultModal = useCallback(() => {
        setVaultModalOpen(false);
        setVaultFormData(INITIAL_VAULT_FORM);
    }, []);

    const handleOpenTransactionModal = useCallback((vaultId: string, type: "DEPOSIT" | "WITHDRAWAL") => {
        setTransactionFormData({ vaultId, amount: 0, type, description: "" });
        setTransactionModalOpen(true);
    }, []);

    const handleCloseTransactionModal = useCallback(() => {
        setTransactionModalOpen(false);
        setTransactionFormData(INITIAL_TRANS_FORM);
    }, []);

    const handleVaultFormChange = useCallback((field: keyof VaultFormData, value: string | number) => {
        setVaultFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleTransactionFormChange = useCallback((field: keyof VaultTransactionFormData, value: string | number) => {
        setTransactionFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSaveVault = useCallback(async () => {
        if (!vaultFormData.name) return;
        await useAction({
            action: async () => vaultFormData._id ? await updateVault(vaultFormData._id, vaultFormData) : await createVault(vaultFormData),
            toastMessages: { success: "Caixinha salva com sucesso", error: "Erro ao salvar caixinha", pending: "Salvando..." },
            callback: () => {
                refresh();
                handleCloseVaultModal();
            }
        });
    }, [vaultFormData, refresh, handleCloseVaultModal]);

    const handleSaveTransaction = useCallback(async () => {
        if (!transactionFormData.vaultId || transactionFormData.amount <= 0) return;
        await useAction({
            action: async () => await processVaultTransaction(transactionFormData.vaultId, { amount: transactionFormData.amount, type: transactionFormData.type, description: transactionFormData.description }),
            toastMessages: { success: "Transação realizada com sucesso", error: "Erro ao processar transação", pending: "Processando..." },
            callback: () => {
                refresh();
                handleCloseTransactionModal();
            }
        });
    }, [transactionFormData, refresh, handleCloseTransactionModal]);

    return useMemo(() => ({ meta, loading, vaults, vaultModalOpen, transactionModalOpen, vaultFormData, transactionFormData, handleSaveVault, handleSaveTransaction, handleCloseVaultModal, handleCloseTransactionModal, handleOpenVaultModal, handleOpenTransactionModal, handleVaultFormChange, handleTransactionFormChange, handlePaginationChange }), [meta, loading, vaults, vaultModalOpen, transactionModalOpen, vaultFormData, transactionFormData, handleSaveVault, handleSaveTransaction, handleCloseVaultModal, handleCloseTransactionModal, handleOpenVaultModal, handleOpenTransactionModal, handleVaultFormChange, handleTransactionFormChange, handlePaginationChange]);
};

export default useVaultsHook;