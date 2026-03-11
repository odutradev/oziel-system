import { Typography, Chip } from "@mui/material";

import { getStatusColor, getStatusLabel } from "./utils";

import type { EmailTemplateModelType } from "@actions/emails/types";
import type { TableColumn } from "@components/fullTable/types";

export const columns: TableColumn<EmailTemplateModelType>[] = [
  {
    key: "trigger",
    label: "Trigger",
    render: (template) => (
      <Typography variant="body2" fontWeight={600}>
        {template.trigger}
      </Typography>
    ),
  },
  {
    key: "subject",
    label: "Assunto",
    render: (template) => <Typography variant="body2">{template.subject}</Typography>,
  },
  {
    key: "description",
    label: "Descrição",
    render: (template) => (
      <Typography variant="body2" color="text.secondary">
        {template.description || "-"}
      </Typography>
    ),
  },
  {
    key: "variables",
    label: "Variáveis",
    render: (template) => <Typography variant="caption">{template.variables?.length || 0} var(s)</Typography>,
  },
  {
    key: "active",
    label: "Status",
    render: (template) => (
      <Chip label={getStatusLabel(template.active)} color={getStatusColor(template.active) as any} size="small" />
    ),
  },
];