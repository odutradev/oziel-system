import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button } from "@mui/material";

import { FormContainer, FormRow } from "./styles";

import type { TransactionModalProps } from "./types";

const TransactionModal = ({ open, formData, onClose, onSave, onChange }: TransactionModalProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{formData._id ? "Editar Transação" : "Nova Transação"}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <FormRow>
                        <TextField
                            label="Título / Descrição Curta"
                            value={formData.title}
                            onChange={(e) => onChange("title", e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Valor (R$)"
                            type="number"
                            value={formData.amount}
                            onChange={(e) => onChange("amount", Number(e.target.value))}
                            fullWidth
                            required
                        />
                    </FormRow>

                    <FormRow>
                        <TextField
                            select
                            label="Tipo"
                            value={formData.type}
                            onChange={(e) => onChange("type", e.target.value)}
                            fullWidth
                            required
                        >
                            <MenuItem value="INCOME">Entrada (Receita)</MenuItem>
                            <MenuItem value="EXPENSE">Saída (Despesa)</MenuItem>
                        </TextField>
                        <TextField
                            select
                            label="Status Inicial"
                            value={formData.status}
                            onChange={(e) => onChange("status", e.target.value)}
                            fullWidth
                            required
                        >
                            <MenuItem value="PENDING">Pendente</MenuItem>
                            <MenuItem value="CONFIRMED">Confirmado</MenuItem>
                        </TextField>
                    </FormRow>

                    <FormRow>
                        <TextField
                            type="date"
                            label="Data"
                            value={formData.date}
                            onChange={(e) => onChange("date", e.target.value)}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Categoria"
                            value={formData.category}
                            onChange={(e) => onChange("category", e.target.value)}
                            fullWidth
                        />
                    </FormRow>

                    <TextField
                        label="Observações Adicionais"
                        value={formData.description}
                        onChange={(e) => onChange("description", e.target.value)}
                        multiline
                        rows={3}
                        fullWidth
                    />
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