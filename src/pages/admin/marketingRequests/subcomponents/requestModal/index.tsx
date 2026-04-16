import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

import InputWithCounter from "@components/inputWithCounter";
import { FormContainer } from "./styles";

import type { RequestModalProps } from "./types";

const RequestModal = ({ open, formData, handleClose, handleSave, onChange }: RequestModalProps) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{formData._id ? "Editar Solicitação" : "Nova Solicitação"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <TextField label="Título da Solicitação" value={formData.title} onChange={(e) => onChange("title", e.target.value)} fullWidth required />
                    <InputWithCounter label="Descrição" value={formData.description} onChange={(e) => onChange("description", e.target.value)} maxLength={500} multiline rows={3} required />
                    {formData._id && (
                        <>
                            <InputWithCounter label="Estratégia" value={formData.strategy || ""} onChange={(e) => onChange("strategy", e.target.value)} maxLength={1000} multiline rows={3} />
                            <InputWithCounter label="Conteúdo" value={formData.content || ""} onChange={(e) => onChange("content", e.target.value)} maxLength={1000} multiline rows={3} />
                            <InputWithCounter label="Resultados" value={formData.results || ""} onChange={(e) => onChange("results", e.target.value)} maxLength={500} multiline rows={3} />
                        </>
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

export default RequestModal;