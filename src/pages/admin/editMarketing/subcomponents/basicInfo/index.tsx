import { TextField } from "@mui/material";

import EditSection from "@components/editSection";
import { InfoContainer } from "./styles";

import type { BasicInfoProps } from "./types";

const BasicInfo = ({ formData, onChange }: BasicInfoProps) => {
    const hasPlannedDate = formData.status !== "DRAFT";

    return (
        <EditSection title="Informações Básicas">
            <InfoContainer>
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
            </InfoContainer>
        </EditSection>
    );
};

export default BasicInfo;