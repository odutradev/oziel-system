import { Chip, Typography } from "@mui/material";

import { getRoleLabel, getStatusColor, getStatusLabel } from "./utils";

import type { TableColumn } from "@components/fullTable/types";
import type { UserModelType } from "@utils/types/models/user";

export const columns: TableColumn<UserModelType>[] = [
  {
    key: "name",
    label: "Nome",
    render: (user) => (
      <Typography variant="body2" fontWeight={500}>
        {user.name || "Sem nome"}
      </Typography>
    ),
  },
  {
    key: "email",
    label: "Email",
    render: (user) => <Typography variant="body2">{user.email}</Typography>,
  },
  {
    key: "role",
    label: "Função",
    render: (user) => (
      <Chip
        label={getRoleLabel(user.role)}
        color={user.role === "admin" ? "secondary" : "default"}
        size="small"
      />
    ),
  },
  {
    key: "coins",
    label: "Créditos",
    render: (user) => <Typography variant="body2">{user.coins}</Typography>,
  },
  {
    key: "status",
    label: "Status",
    render: (user) => (
      <Chip
        label={getStatusLabel(user.status)}
        color={getStatusColor(user.status)}
        size="small"
      />
    ),
  },
  {
    key: "createAt",
    label: "Cadastro",
    render: (user) => (
      <Typography variant="body2">
        {new Date(user.createAt).toLocaleDateString("pt-BR")}
      </Typography>
    ),
  },
];