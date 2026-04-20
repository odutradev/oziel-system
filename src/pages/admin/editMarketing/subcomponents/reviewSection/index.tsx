import { TextField } from "@mui/material";

import EditSection from "@components/editSection";
import { ReviewContainer } from "./styles";

import type { ReviewSectionProps } from "./types";

const ReviewSection = ({ formData, onChange, isReviewMode }: ReviewSectionProps) => {
    if (!isReviewMode && !formData.feedbackNotes) return null;

    return (
        <EditSection title="Revisão e Feedback">
            <ReviewContainer>
                <TextField
                    label="Feedback / Notas de Revisão"
                    value={formData.feedbackNotes || ""}
                    onChange={(e) => onChange("feedbackNotes", e.target.value)}
                    placeholder="Obrigatório em caso de rejeição"
                    disabled={!isReviewMode}
                    required={isReviewMode}
                    fullWidth
                />
            </ReviewContainer>
        </EditSection>
    );
};

export default ReviewSection;