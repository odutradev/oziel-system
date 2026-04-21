import { TextField } from "@mui/material";

import EditSection from "@components/editSection";
import { InfoContainer } from "./styles";

import type { BasicInfoProps } from "./types";

const BasicInfo = ({ formData, onChange }: BasicInfoProps) => (
    <EditSection title="Informações da Reunião">
        <InfoContainer>
            <TextField
                label="Título da Reunião"
                value={formData.title}
                onChange={(e) => onChange("title", e.target.value)}
                fullWidth
                required
            />
            <TextField
                label="Data da Reunião"
                type="datetime-local"
                value={formData.date || ""}
                onChange={(e) => onChange("date", e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
            />
        </InfoContainer>
    </EditSection>
);

export default BasicInfo;