import { Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, TextField, Switch, Button, Box } from "@mui/material";

import InputWithCounter from "@components/inputWithCounter";
import { FormContainer } from "./styles";

import type { OperatorModalProps } from "./types";

const OperatorModal = ({ open, formData, onClose, onSave, onChange }: OperatorModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{formData._id ? "Editar Operador" : "Novo Operador"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <InputWithCounter label="Nome do Operador" value={formData.name} onChange={(e) => onChange("name", e.target.value)} maxLength={100} required />
                    <TextField label="Documento (CPF/CNPJ)" value={formData.document || ""} onChange={(e) => onChange("document", e.target.value)} fullWidth />
                    <Box display="flex" justifyContent="flex-end">
                        <FormControlLabel control={<Switch checked={formData.active} onChange={(e) => onChange("active", e.target.checked)} color="primary" />} label="Operador Ativo" />
                    </Box>
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={onSave} variant="contained" color="primary">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OperatorModal;