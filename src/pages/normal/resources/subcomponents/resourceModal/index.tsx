import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from "@mui/material";

import InputWithCounter from "@components/inputWithCounter";
import ToggleGroup from "@components/toggleGroup";
import { FormContainer } from "./styles";

import type { ResourceModalProps } from "./types";

const STATUS_OPTIONS = [
    { value: "true", label: "Ativo" },
    { value: "false", label: "Inativo" }
];

const ResourceModal = ({ state, onClose, onSave, onChange }: ResourceModalProps) => {
    const isFleet = state.type === "fleets";
    const isEdit = !!state.data._id;
    const title = isEdit ? (isFleet ? "Editar Frota" : "Editar Operador") : (isFleet ? "Nova Frota" : "Novo Operador");

    return (
        <Dialog open={state.open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <InputWithCounter
                        label={isFleet ? "Nome da Frota" : "Nome do Operador"}
                        value={state.data.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        maxLength={100}
                        required
                    />
                    {isFleet ? (
                        <TextField
                            label="Descrição"
                            value={state.data.description || ""}
                            onChange={(e) => onChange("description", e.target.value)}
                            fullWidth
                            multiline
                            rows={3}
                        />
                    ) : (
                        <TextField
                            label="Documento (CPF/CNPJ)"
                            value={state.data.document || ""}
                            onChange={(e) => onChange("document", e.target.value)}
                            fullWidth
                        />
                    )}
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            Status no Sistema
                        </Typography>
                        <ToggleGroup
                            options={STATUS_OPTIONS}
                            value={String(state.data.active)}
                            onChange={(_, val) => val !== null && onChange("active", val === "true")}
                        />
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

export default ResourceModal;