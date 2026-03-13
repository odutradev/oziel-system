import { Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, TextField, Switch, Button, Box } from "@mui/material";

import { TypeToggleWrapper, FormContainer, FormRow } from "./styles";
import InputWithCounter from "@components/inputWithCounter";
import { formatCurrency } from "@utils/formatters";
import ToggleGroup from "@components/toggleGroup";

import type { TransactionModalProps } from "./types";

const TYPE_OPTIONS = [
    { value: "INCOME", label: "Entrada" },
    { value: "EXPENSE", label: "Saída" }
];

const TransactionModal = ({ open, formData, onClose, onSave, onChange }: TransactionModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{formData._id ? "Editar Transação" : "Nova Transação"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <TypeToggleWrapper varianttype={formData.type}>
                        <ToggleGroup options={TYPE_OPTIONS} value={formData.type} onChange={(_, v) => v && onChange("type", v)} />
                    </TypeToggleWrapper>
                    <InputWithCounter label="Título / Descrição Curta" value={formData.title} onChange={(e) => onChange("title", e.target.value)} maxLength={50} required />
                    <InputWithCounter label="Observações Adicionais" value={formData.description || ""} onChange={(e) => onChange("description", e.target.value)} maxLength={150} multiline rows={3} />
                    <FormRow>
                        <TextField label="Valor" value={formatCurrency(formData.amount)} onChange={(e) => onChange("amount", Number(e.target.value.replace(/\D/g, "")) / 100)} fullWidth required />
                        <TextField type="date" label="Data" value={formData.date} onChange={(e) => onChange("date", e.target.value)} InputLabelProps={{ shrink: true }} fullWidth required />
                    </FormRow>
                    <Box display="flex" justifyContent="flex-end">
                        <FormControlLabel control={<Switch checked={formData.status === "CONFIRMED"} onChange={(e) => onChange("status", e.target.checked ? "CONFIRMED" : "PENDING")} color={formData.type === "INCOME" ? "success" : "error"} />} label="Transação confirmada?" />
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

export default TransactionModal;