import { TextField, Typography, Box } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

import { FormContainer, EditorWrapper } from "./styles";

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
                multiline
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
                <EditorWrapper data-color-mode="light">
                    <MDEditor
                        value={formData.strategy || ""}
                        onChange={(val) => onChange("strategy", val || "")}
                        preview={isLocked ? "preview" : "live"}
                        hideToolbar={isLocked}
                        height={300}
                    />
                </EditorWrapper>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="subtitle2" color="textSecondary">Conteúdo / Legenda (Markdown)</Typography>
                <EditorWrapper data-color-mode="light">
                    <MDEditor
                        value={formData.content || ""}
                        onChange={(val) => onChange("content", val || "")}
                        height={400}
                    />
                </EditorWrapper>
            </Box>
        </FormContainer>
    );
};

export default MarketingForm;