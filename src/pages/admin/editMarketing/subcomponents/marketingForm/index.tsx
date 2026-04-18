import { TextField, Typography, Box } from "@mui/material";

import MarkdownEditor from "@components/markdownEditor";
import { FormContainer } from "./styles";

import type { MarketingFormProps } from "./types";

const MarketingForm = ({ formData, onChange, isEditing }: MarketingFormProps) => {
    const isLocked = isEditing && formData.status !== "DRAFT";

    return (
        <FormContainer>
            <TextField
                label="Título da Campanha/Post"
                value={formData.title}
                onChange={(e) => onChange("title", e.target.value)}
                disabled={isLocked}
                fullWidth
                required
            />
            <TextField
                label="Descrição Inicial"
                value={formData.description}
                onChange={(e) => onChange("description", e.target.value)}
                disabled={isLocked}
                fullWidth
                required
                rows={3}
            />
            {isLocked && (
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
                <Typography variant="subtitle2" color="textSecondary">Estratégia (Markdown)</Typography>
                <MarkdownEditor
                    value={formData.strategy || ""}
                    onChange={(val) => onChange("strategy", val)}
                    preview={isLocked ? "preview" : "live"}
                    hideToolbar={isLocked}
                    height={300}
                />
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="subtitle2" color="textSecondary">Conteúdo / Legenda (Markdown)</Typography>
                <MarkdownEditor
                    value={formData.content || ""}
                    onChange={(val) => onChange("content", val)}
                    height={400}
                />
            </Box>
        </FormContainer>
    );
};

export default MarketingForm;