export const formatCurrency = (value: number): string => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
export const formatDate = (date: string | Date): string => new Intl.DateTimeFormat("pt-BR").format(new Date(date));
export const formatInputDate = (date: string | Date): string => new Date(date).toISOString().split("T")[0];