import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button } from "@mui/material";

import { TICKET_PRIORITIES, TICKET_STATUSES } from "../../types";
import InputWithCounter from "@components/inputWithCounter";
import { FormContainer, FormRow } from "./styles";

import type { TicketModalProps } from "./types";

const TicketModal = ({ open, formData, handleClose, handleSave, onChange }: TicketModalProps) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{formData._id ? "Editar Chamado" : "Novo Chamado"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <TextField label="Título do Chamado" value={formData.title} onChange={(e) => onChange("title", e.target.value)} fullWidth required />
                    <FormRow>
                        <TextField select label="Prioridade" value={formData.priority} onChange={(e) => onChange("priority", e.target.value)} fullWidth>
                            {TICKET_PRIORITIES.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                        </TextField>
                        <TextField select label="Status" value={formData.status} onChange={(e) => onChange("status", e.target.value)} disabled={!formData._id} fullWidth>
                            {TICKET_STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </TextField>
                    </FormRow>
                    <InputWithCounter label="Descrição Detalhada" value={formData.description} onChange={(e) => onChange("description", e.target.value)} maxLength={500} multiline rows={4} required />
                    {formData._id && (
                        <InputWithCounter label="Notas de Resolução (Opcional)" value={formData.resolutionNotes || ""} onChange={(e) => onChange("resolutionNotes", e.target.value)} maxLength={500} multiline rows={3} />
                    )}
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={handleClose} color="inherit">Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary" disabled={!formData.title || !formData.description}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TicketModal;