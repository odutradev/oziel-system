import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button } from "@mui/material";

import { CONTRACT_TYPES_ARRAY, CONTRACT_STATUS_ARRAY } from "@utils/types/models/contract";
import { formatCurrency } from "@utils/formatters";
import { FormContainer, FormRow } from "./styles";

import type { ContractModalProps } from "./types";

const ContractModal = ({ open, formData, handleClose, handleSave, onChange }: ContractModalProps) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>{formData._id ? "Editar Contrato" : "Novo Contrato"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <FormRow>
                        <TextField label="Código do Contrato" value={formData.code} onChange={(e) => onChange("code", e.target.value)} fullWidth required />
                        <TextField select label="Tipo" value={formData.type} onChange={(e) => onChange("type", e.target.value)} fullWidth required>
                            {CONTRACT_TYPES_ARRAY.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                        </TextField>
                    </FormRow>
                    <FormRow>
                        <TextField type="date" label="Data do Contrato" value={formData.contractDate} onChange={(e) => onChange("contractDate", e.target.value)} InputLabelProps={{ shrink: true }} fullWidth required />
                        <TextField type="date" label="Previsão de Entrega" value={formData.deliveryForecast} onChange={(e) => onChange("deliveryForecast", e.target.value)} InputLabelProps={{ shrink: true }} fullWidth required />
                    </FormRow>
                    <FormRow>
                        <TextField label="Valor Total" value={formatCurrency(formData.totalValue)} onChange={(e) => onChange("totalValue", Number(e.target.value.replace(/\D/g, "")) / 100)} fullWidth required />
                        <TextField label="Preço Total de Venda" value={formatCurrency(formData.totalSalePrice)} onChange={(e) => onChange("totalSalePrice", Number(e.target.value.replace(/\D/g, "")) / 100)} fullWidth required />
                    </FormRow>
                    {formData._id && (
                        <TextField select label="Status" value={formData.status || ""} onChange={(e) => onChange("status", e.target.value)} fullWidth>
                            {CONTRACT_STATUS_ARRAY.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </TextField>
                    )}
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={handleClose} color="inherit">Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary" disabled={!formData.code || !formData.type || !formData.contractDate || !formData.deliveryForecast || formData.totalValue <= 0}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ContractModal;