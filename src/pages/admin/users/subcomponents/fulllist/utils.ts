export const getStatusColor = (status: string) => {
  const colors: Record<string, "success" | "info" | "error" | "default"> = {
    loggedIn: "success",
    registered: "info",
    blocked: "error",
  };
  return colors[status] ?? "default";
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    loggedIn: "Logado",
    registered: "Registrado",
    blocked: "Bloqueado",
  };
  return labels[status] ?? status;
};

export const getRoleLabel = (role: string): string => {
  const labels: Record<string, string> = {
    admin: "Administrador",
    normal: "Normal",
  };
  return labels[role] ?? role;
};