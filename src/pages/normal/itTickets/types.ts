import type { TicketModelType, TicketPriority, TicketStatus } from "@actions/itTickets/types";

export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
    CRITICAL: "Crítico",
    HIGH: "Alta",
    MEDIUM: "Média",
    LOW: "Baixa"
};

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
    OPEN: "Aberto",
    ANALYSIS: "Em Análise",
    INTERVENTION: "Em Intervenção",
    WAITING_USER: "Aguardando Usuário",
    TESTING: "Em Testes",
    VALIDATION: "Em Validação",
    CLOSED: "Fechado"
};

export interface TicketsHookProps {
    handleDelete: (id: string) => Promise<void>;
    handleCreateNew: () => void;
    handleEdit: (id: string) => void;
    tickets: TicketModelType[];
    loading: boolean;
}