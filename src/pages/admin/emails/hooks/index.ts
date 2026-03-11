import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getEmailTemplates, seedInitialTemplates } from "@actions/emails";
import type { EmailTemplateModelType } from "@actions/emails/types";
import usePagination from "@hooks/usePagination";
import useAction from "@hooks/useAction";

const useEmailTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data, meta, loading, page, limit, setPage, setLimit, refresh } = usePagination<EmailTemplateModelType>(
    async (_currentPage, _currentLimit) => await getEmailTemplates(),
    { page: 1, limit: 15 }
  );

  const handleCreateTemplate = () => navigate("/dashboard/admin/emails/edit/new");
  const handleEditTemplate = (template: EmailTemplateModelType) => navigate(`/dashboard/admin/emails/edit/${template._id}`);
  const handleSendBulk = () => navigate("/dashboard/admin/emails/send-bulk");

  const handleSeedTemplates = async () => {
    await useAction({
      action: async () => await seedInitialTemplates(),
      toastMessages: {
        success: "Templates iniciais criados com sucesso",
        error: "Erro ao criar templates iniciais",
        pending: "Criando templates...",
      },
      callback: () => refresh(),
    });
  };

  const filteredData = searchTerm
    ? data.filter((template) =>
        template.trigger?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  useEffect(() => {
    refresh();
  }, []);

  return {
    handlers: {
      handleCreateTemplate,
      handleEditTemplate,
      handleSeedTemplates,
      handleSendBulk,
      setSearchTerm,
      setLimit,
      setPage,
    },
    state: {
      templates: filteredData,
      searchTerm,
      loading,
      limit,
      page,
      meta,
    },
  };
};

export default useEmailTemplates;