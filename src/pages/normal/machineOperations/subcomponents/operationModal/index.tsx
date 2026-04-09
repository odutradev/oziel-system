import { Autocomplete, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from "@mui/material";

import InputWithCounter from "@components/inputWithCounter";
import { FormContainer, FormRow } from "./styles";
import { formatCurrency } from "@utils/formatters";

import type { OperationModalProps } from "./types";

const OperationModal = ({ open, formData, operators, fleets, onClose, onSave, onChange }: OperationModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{formData._id ? "Editar Operação" : "Nova Operação"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <FormRow>
                        <Autocomplete options={operators} getOptionLabel={(option) => option.name} value={formData.operator} onChange={(_, newValue) => onChange("operator", newValue)} renderInput={(params) => <TextField {...params} label="Operador" required />} fullWidth />
                        <Autocomplete options={fleets} getOptionLabel={(option) => option.name} value={formData.fleet} onChange={(_, newValue) => onChange("fleet", newValue)} renderInput={(params) => <TextField {...params} label="Frota" required />} fullWidth />
                    </FormRow>
                    <FormRow>
                        <TextField type="date" label="Data da Operação" value={formData.operationDate} onChange={(e) => onChange("operationDate", e.target.value)} InputLabelProps={{ shrink: true }} fullWidth required />
                        <TextField label="Valor por Hora" value={formatCurrency(formData.hourlyRate)} onChange={(e) => onChange("hourlyRate", Number(e.target.value.replace(/\D/g, "")) / 100)} fullWidth required />
                    </FormRow>
                    <Box mt={1} mb={1}><strong>Horímetro do Serviço</strong></Box>
                    <FormRow>
                        <TextField type="number" label="Início" value={formData.hourMeterServiceStart} onChange={(e) => onChange("hourMeterServiceStart", Number(e.target.value))} fullWidth />
                        <TextField type="number" label="Término" value={formData.hourMeterServiceEnd} onChange={(e) => onChange("hourMeterServiceEnd", Number(e.target.value))} fullWidth />
                    </FormRow>
                    <Box mt={1} mb={1}><strong>Horímetro de Deslocamento (Opcional)</strong></Box>
                    <FormRow>
                        <TextField type="number" label="Saída" value={formData.hourMeterDeparture} onChange={(e) => onChange("hourMeterDeparture", Number(e.target.value))} fullWidth />
                        <TextField type="number" label="Chegada" value={formData.hourMeterArrival} onChange={(e) => onChange("hourMeterArrival", Number(e.target.value))} fullWidth />
                    </FormRow>
                    <InputWithCounter label="Descrição / Observações" value={formData.description || ""} onChange={(e) => onChange("description", e.target.value)} maxLength={200} multiline rows={3} />
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={onSave} variant="contained" color="primary" disabled={!formData.operator || !formData.fleet}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OperationModal;