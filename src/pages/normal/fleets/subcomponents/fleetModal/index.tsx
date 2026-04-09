import { Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, TextField, Switch, Button, Box } from "@mui/material";

import InputWithCounter from "@components/inputWithCounter";
import { FormContainer } from "./styles";

import type { FleetModalProps } from "./types";

const FleetModal = ({ open, formData, onClose, onSave, onChange }: FleetModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{formData._id ? "Editar Frota" : "Nova Frota"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <InputWithCounter label="Nome da Frota" value={formData.name} onChange={(e) => onChange("name", e.target.value)} maxLength={100} required />
                    <TextField label="Descrição" value={formData.description || ""} onChange={(e) => onChange("description", e.target.value)} fullWidth multiline rows={3} />
                    <Box display="flex" justifyContent="flex-end">
                        <FormControlLabel control={<Switch checked={formData.active} onChange={(e) => onChange("active", e.target.checked)} color="primary" />} label="Frota Ativa" />
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

export default FleetModal;