import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button } from "@mui/material";

import InputWithCounter from "@components/inputWithCounter";
import { FormContainer } from "./styles";

import type { ReviewModalProps } from "./types";

const ReviewModal = ({ open, reviewData, handleClose, handleSave, onChange }: ReviewModalProps) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Revisar Solicitação</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <TextField select label="Decisão" value={reviewData.approved ? "true" : "false"} onChange={(e) => onChange("approved", e.target.value === "true")} fullWidth>
                        <MenuItem value="true">Aprovar Solicitação</MenuItem>
                        <MenuItem value="false">Rejeitar / Solicitar Revisão</MenuItem>
                    </TextField>
                    <InputWithCounter label="Notas de Feedback" value={reviewData.feedbackNotes || ""} onChange={(e) => onChange("feedbackNotes", e.target.value)} maxLength={500} multiline rows={4} />
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={handleClose} color="inherit">Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Confirmar Revisão</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReviewModal;