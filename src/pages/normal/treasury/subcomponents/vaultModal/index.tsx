import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from "@mui/material";

import { FormContainer } from "./styles";
import InputWithCounter from "@components/inputWithCounter";
import { formatCurrency } from "@utils/formatters";

import type { VaultModalProps } from "./types";

const VaultModal = ({ open, formData, onClose, onSave, onChange }: VaultModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{formData._id ? "Editar Caixinha" : "Nova Caixinha"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <InputWithCounter label="Nome da Caixinha" value={formData.name} onChange={(e) => onChange("name", e.target.value)} maxLength={50} required />
                    <TextField label="Meta Financeira (Opcional)" value={formatCurrency(formData.goal ?? 0)} onChange={(e) => onChange("goal", Number(e.target.value.replace(/\D/g, "")) / 100)} fullWidth />
                    <InputWithCounter label="Descrição / Motivo" value={formData.description || ""} onChange={(e) => onChange("description", e.target.value)} maxLength={150} multiline rows={3} />
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={onSave} variant="contained" color="primary">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default VaultModal;