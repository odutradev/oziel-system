import { Autocomplete, DialogTitle, DialogContent, DialogActions, TextField, Dialog, Button, Box } from "@mui/material";

import InputWithCounter from "@components/inputWithCounter";
import { formatCurrency } from "@utils/formatters";
import { FormContainer, FormRow } from "./styles";

import type { OperationModalProps } from "./types";

const OperationModal = ({ open, formData, operators, assets, onClose, onSave, onChange }: OperationModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{formData._id ? "Editar Operação" : "Nova Operação"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <FormRow>
                        <Autocomplete options={operators} getOptionLabel={(option) => option.name} value={formData.operator} onChange={(_, newValue) => onChange("operator", newValue)} renderInput={(params) => <TextField {...params} label="Operador" required />} fullWidth />
                        <Autocomplete options={assets} getOptionLabel={(option) => option.name} value={formData.asset} onChange={(_, newValue) => onChange("asset", newValue)} renderInput={(params) => <TextField {...params} label="Ativo" required />} fullWidth />
                    </FormRow>
                    <FormRow>
                        <TextField type="date" label="Data da Operação" value={formData.operationDate} onChange={(e) => onChange("operationDate", e.target.value)} InputLabelProps={{ shrink: true }} fullWidth required />
                        <TextField label="Valor por Hora" value={formatCurrency(formData.hourlyRate)} onChange={(e) => onChange("hourlyRate", Number(e.target.value.replace(/\D/g, "")) / 100)} fullWidth required />
                    </FormRow>
                    <Box mt={1} mb={1}><strong>Horímetro do Serviço</strong></Box>
                    <FormRow>
                        <TextField label="Início" value={(formData.hourMeterServiceStart ?? 0).toFixed(1)} onChange={(e) => onChange("hourMeterServiceStart", Number(e.target.value.replace(/\D/g, "")) / 10)} fullWidth />
                        <TextField label="Término" value={(formData.hourMeterServiceEnd ?? 0).toFixed(1)} onChange={(e) => onChange("hourMeterServiceEnd", Number(e.target.value.replace(/\D/g, "")) / 10)} fullWidth />
                    </FormRow>
                    <Box mt={1} mb={1}><strong>Horímetro de Deslocamento (Opcional)</strong></Box>
                    <FormRow>
                        <TextField label="Saída" value={(formData.hourMeterDeparture ?? 0).toFixed(1)} onChange={(e) => onChange("hourMeterDeparture", Number(e.target.value.replace(/\D/g, "")) / 10)} fullWidth />
                        <TextField label="Chegada" value={(formData.hourMeterArrival ?? 0).toFixed(1)} onChange={(e) => onChange("hourMeterArrival", Number(e.target.value.replace(/\D/g, "")) / 10)} fullWidth />
                    </FormRow>
                    <InputWithCounter label="Descrição / Observações" value={formData.serviceDescription || ""} onChange={(e) => onChange("serviceDescription", e.target.value)} maxLength={200} multiline rows={3} />
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={onSave} variant="contained" color="primary" disabled={!formData.operator || !formData.asset || !formData.serviceDescription}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OperationModal;