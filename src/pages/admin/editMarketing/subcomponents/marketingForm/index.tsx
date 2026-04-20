import { Typography, TextField, Box } from "@mui/material";

import MarkdownEditor from "@components/markdownEditor";
import { FormContainer } from "./styles";

import type { MarketingFormProps } from "./types";

const MarketingForm = ({ formData, onChange }: MarketingFormProps) => {
    const isReviewMode = formData.status === "WAITING_APPROVAL";
    const hasPlannedDate = formData.status !== "DRAFT";

    return (
        <FormContainer>
            <TextField
                label="Título da Campanha/Post"
                value={formData.title}
                onChange={(e) => onChange("title", e.target.value)}
                fullWidth
                required
            />
            <TextField
                label="Descrição Inicial"
                value={formData.description}
                onChange={(e) => onChange("description", e.target.value)}
                fullWidth
                required
            />
            {hasPlannedDate && (
                <TextField
                    label="Data Planejada"
                    type="datetime-local"
                    value={formData.plannedDate || ""}
                    onChange={(e) => onChange("plannedDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            )}
            <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="subtitle2" color="textSecondary">
                    Estratégia (Markdown)
                </Typography>
                <MarkdownEditor
                    value={formData.strategy || ""}
                    onChange={(val) => onChange("strategy", val)}
                    preview="live"
                    height={300}
                />
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="subtitle2" color="textSecondary">
                    Conteúdo / Legenda (Markdown)
                </Typography>
                <MarkdownEditor
                    value={formData.content || ""}
                    onChange={(val) => onChange("content", val)}
                    preview="live"
                    height={400}
                />
            </Box>
            {(isReviewMode || formData.feedbackNotes) && (
                <TextField
                    label="Feedback / Notas de Revisão"
                    value={formData.feedbackNotes || ""}
                    onChange={(e) => onChange("feedbackNotes", e.target.value)}
                    placeholder="Obrigatório em caso de rejeição"
                    disabled={!isReviewMode}
                    required={isReviewMode}
                    fullWidth
                />
            )}
        </FormContainer>
    );
};

export default MarketingForm;