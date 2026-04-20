import { Grid, TextField, MenuItem, Typography, Box } from "@mui/material";

import MarkdownEditor from "@components/markdownEditor";
import EditSection from "@components/editSection";
import FormActions from "@components/formActions";
import { TICKET_PRIORITY_LABELS, TICKET_STATUS_LABELS } from "../../../itTickets/types";

import type { TicketPriority, TicketStatus } from "@actions/itTickets/types";
import type { TicketFormProps } from "./types";

const TicketForm = ({ formData, isEditing, loading, onChange, onSave, onCancel }: TicketFormProps) => {
    const isSaveDisabled = !formData.title || !formData.description;

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <EditSection title="Informações Básicas">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Título"
                            value={formData.title}
                            onChange={(e) => onChange("title", e.target.value)}
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            select
                            fullWidth
                            label="Prioridade"
                            value={formData.priority}
                            onChange={(e) => onChange("priority", e.target.value as TicketPriority)}
                            disabled={loading}
                        >
                            {Object.entries(TICKET_PRIORITY_LABELS).map(([key, label]) => (
                                <MenuItem key={key} value={key}>{label}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {isEditing && (
                        <Grid item xs={12} md={3}>
                            <TextField
                                select
                                fullWidth
                                label="Status"
                                value={formData.status}
                                onChange={(e) => onChange("status", e.target.value as TicketStatus)}
                                disabled={loading}
                            >
                                {Object.entries(TICKET_STATUS_LABELS).map(([key, label]) => (
                                    <MenuItem key={key} value={key}>{label}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    )}
                </Grid>
            </EditSection>

            <EditSection title="Descrição do Chamado">
                <Typography variant="body2" color="text.secondary" mb={2}>
                    Descreva o problema ou solicitação com o máximo de detalhes possível.
                </Typography>
                <MarkdownEditor
                    value={formData.description}
                    onChange={(val) => onChange("description", val)}
                    height={300}
                />
            </EditSection>

            {isEditing && (
                <EditSection title="Notas de Resolução">
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Adicione informações sobre como o chamado foi ou está sendo resolvido.
                    </Typography>
                    <MarkdownEditor
                        value={formData.resolutionNotes || ""}
                        onChange={(val) => onChange("resolutionNotes", val)}
                        height={200}
                    />
                </EditSection>
            )}

            <FormActions
                onSave={onSave}
                onCancel={onCancel}
                disabled={isSaveDisabled}
                loading={loading}
            />
        </Box>
    );
};

export default TicketForm;