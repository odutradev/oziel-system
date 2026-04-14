import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

import InputWithCounter from "@components/inputWithCounter";
import { FormContainer, FormGrid } from "./styles";

import type { MemberModalProps } from "./types";

const MemberModal = ({ open, formData, onClose, onSave, onChange }: MemberModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{formData._id ? "Editar Membro RH" : "Novo Membro RH"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <FormGrid>
                        <InputWithCounter label="Nome Completo" value={formData.name} onChange={(e) => onChange("name", e.target.value)} maxLength={100} required />
                        <TextField label="CPF ou RG" value={formData.cpfOrRg} onChange={(e) => onChange("cpfOrRg", e.target.value)} required fullWidth />
                    </FormGrid>
                    <FormGrid>
                        <TextField label="Email" type="email" value={formData.email} onChange={(e) => onChange("email", e.target.value)} fullWidth />
                        <TextField label="Telefone" value={formData.phone} onChange={(e) => onChange("phone", e.target.value)} fullWidth />
                    </FormGrid>
                    <FormGrid>
                        <TextField label="Endereço" value={formData.address} onChange={(e) => onChange("address", e.target.value)} fullWidth />
                        <TextField label="Membros na Família" type="number" value={formData.familyMembers} onChange={(e) => onChange("familyMembers", e.target.value)} fullWidth />
                    </FormGrid>
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={onSave} variant="contained" color="primary">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MemberModal;