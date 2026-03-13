import { Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, TextField, MenuItem, Switch, Button, Box } from "@mui/material";

import { TypeToggleWrapper, FormContainer, FormRow } from "./styles";
import InputWithCounter from "@components/inputWithCounter";
import ToggleGroup from "@components/toggleGroup";
import { formatCurrency } from "@utils/formatters";

import type { RecurringModalProps } from "./types";

const TYPE_OPTIONS = [{ value: "INCOME", label: "Entrada" }, { value: "EXPENSE", label: "Saída" }];
const FREQUENCY_OPTIONS = [{ value: "DAILY", label: "Diário" }, { value: "WEEKLY", label: "Semanal" }, { value: "MONTHLY", label: "Mensal" }, { value: "YEARLY", label: "Anual" }, { value: "CUSTOM_DAYS", label: "Personalizado (Dias)" }];

const RecurringModal = ({ open, formData, onClose, onSave, onChange }: RecurringModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{formData._id ? "Editar Agendamento" : "Novo Agendamento"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <TypeToggleWrapper varianttype={formData.type}>
                        <ToggleGroup options={TYPE_OPTIONS} value={formData.type} onChange={(_, v) => v && onChange("type", v as string)} />
                    </TypeToggleWrapper>
                    <InputWithCounter label="Título / Descrição Curta" value={formData.title} onChange={(e) => onChange("title", e.target.value)} maxLength={50} required />
                    <InputWithCounter label="Observações Adicionais" value={formData.description || ""} onChange={(e) => onChange("description", e.target.value)} maxLength={150} multiline rows={3} />
                    <FormRow>
                        <TextField label="Valor" value={formatCurrency(formData.amount)} onChange={(e) => onChange("amount", Number(e.target.value.replace(/\D/g, "")) / 100)} fullWidth required />
                        <TextField select label="Frequência" value={formData.frequency} onChange={(e) => onChange("frequency", e.target.value)} fullWidth required>
                            {FREQUENCY_OPTIONS.map((opt) => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
                        </TextField>
                    </FormRow>
                    <FormRow>
                        <TextField type="date" label="Próxima Execução" value={formData.nextExecution} onChange={(e) => onChange("nextExecution", e.target.value)} InputLabelProps={{ shrink: true }} fullWidth required />
                        {formData.frequency === "CUSTOM_DAYS" && <TextField type="number" label="Intervalo em Dias" value={formData.intervalDays || ""} onChange={(e) => onChange("intervalDays", Number(e.target.value))} fullWidth required />}
                    </FormRow>
                    <Box display="flex" justifyContent="flex-end">
                        <FormControlLabel control={<Switch checked={formData.active} onChange={(e) => onChange("active", e.target.checked)} color="primary" />} label="Agendamento Ativo?" />
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

export default RecurringModal;