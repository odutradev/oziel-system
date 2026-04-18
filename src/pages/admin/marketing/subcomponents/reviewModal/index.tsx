import { DialogTitle, DialogContent, DialogActions, Typography, Divider, Dialog, Button, Box } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";

import InputWithCounter from "@components/inputWithCounter";
import { FormContainer, ReadOnlySection } from "./styles";

import type { ReviewModalProps } from "./types";

const ReviewModal = ({ open, item, onClose, onSave }: ReviewModalProps) => {
    const [feedbackNotes, setFeedbackNotes] = useState("");
    const theme = useTheme();

    useEffect(() => {
        if (open) setFeedbackNotes("");
    }, [open]);

    const handleAction = (approved: boolean) => {
        if (!item?._id) return;
        if (!approved && !feedbackNotes) return;
        onSave({ _id: item._id, approved, feedbackNotes });
    };

    if (!item) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Revisar Conteúdo: {item.title}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <ReadOnlySection data-color-mode={theme.palette.mode}>
                        <Typography variant="subtitle2" color="textSecondary" mb={1}>Estratégia Proposta</Typography>
                        <MDEditor.Markdown source={item.strategy || "Nenhuma estratégia definida."} />
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" color="textSecondary" mb={1}>Conteúdo / Legenda</Typography>
                        <MDEditor.Markdown source={item.content || "Nenhum conteúdo definido."} />
                    </ReadOnlySection>
                    <InputWithCounter label="Feedback / Notas de Revisão" value={feedbackNotes} onChange={(e) => setFeedbackNotes(e.target.value)} maxLength={1000} multiline rows={4} placeholder="Obrigatório em caso de rejeição" />
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2, justifyContent: "space-between" }}>
                <Button onClick={onClose} color="inherit">Fechar</Button>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button onClick={() => handleAction(false)} variant="outlined" color="error" startIcon={<Cancel />} disabled={!feedbackNotes}>Solicitar Ajustes</Button>
                    <Button onClick={() => handleAction(true)} variant="contained" color="success" startIcon={<CheckCircle />}>Aprovar Publicação</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default ReviewModal;