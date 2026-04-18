import { DialogTitle, DialogContent, DialogActions, TextField, Dialog, Button } from "@mui/material";
import { useState, useEffect } from "react";

import InputWithCounter from "@components/inputWithCounter";
import { FormContainer } from "./styles";

import type { DraftFormData } from "../../types";
import type { DraftModalProps } from "./types";

const INITIAL_STATE: DraftFormData = { title: "", description: "", strategy: "", content: "" };

const DraftModal = ({ open, draft, onClose, onSave }: DraftModalProps) => {
    const [formData, setFormData] = useState<DraftFormData>(INITIAL_STATE);

    useEffect(() => {
        if (open && draft) setFormData({ _id: draft._id, title: draft.title, description: draft.description, strategy: draft.strategy || "", content: draft.content || "" });
        if (open && !draft) setFormData(INITIAL_STATE);
    }, [open, draft]);

    const handleChange = (field: keyof DraftFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (!formData.title || !formData.description) return;
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{draft ? "Editar Conteúdo" : "Novo Rascunho"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <TextField label="Título" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} fullWidth required />
                    <InputWithCounter label="Descrição Inicial" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} maxLength={300} multiline rows={3} required />
                    <InputWithCounter label="Estratégia (Opcional)" value={formData.strategy} onChange={(e) => handleChange("strategy", e.target.value)} maxLength={1000} multiline rows={4} />
                    <InputWithCounter label="Conteúdo Base / Legenda (Opcional)" value={formData.content} onChange={(e) => handleChange("content", e.target.value)} maxLength={2000} multiline rows={6} />
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary" disabled={!formData.title || !formData.description}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DraftModal;