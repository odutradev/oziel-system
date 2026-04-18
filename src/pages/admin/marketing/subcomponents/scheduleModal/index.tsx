import { DialogTitle, DialogContent, DialogActions, TextField, Dialog, Button } from "@mui/material";
import { useState, useEffect } from "react";

import { formatInputDate } from "@utils/formatters";
import { FormContainer } from "./styles";

import type { ScheduleModalProps } from "./types";

const ScheduleModal = ({ open, draftId, onClose, onSave }: ScheduleModalProps) => {
    const [plannedDate, setPlannedDate] = useState<string>("");

    useEffect(() => {
        if (open) setPlannedDate(formatInputDate(new Date()));
    }, [open]);

    const handleSave = () => {
        if (!plannedDate || !draftId) return;
        onSave({ _id: draftId, plannedDate });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Agendar Campanha</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <TextField type="datetime-local" label="Data Planejada" value={plannedDate} onChange={(e) => setPlannedDate(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth required />
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary" disabled={!plannedDate}>Confirmar Agendamento</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleModal;