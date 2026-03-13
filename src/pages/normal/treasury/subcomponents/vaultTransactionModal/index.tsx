import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from "@mui/material";

import InputWithCounter from "@components/inputWithCounter";
import { formatCurrency } from "@utils/formatters";
import { FormContainer, InfoBox } from "./styles";

import type { VaultTransactionModalProps } from "./types";

const VaultTransactionModal = ({ open, formData, onClose, onSave, onChange }: VaultTransactionModalProps) => {
    const isDeposit = formData.type === "DEPOSIT";
    const title = isDeposit ? "Guardar Dinheiro" : "Resgatar Dinheiro";
    const colorType = isDeposit ? "success" : "error";

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle color={`${colorType}.main`}>{title}</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <InfoBox variantcolor={colorType}>
                        <Typography variant="body2">{isDeposit ? "O valor será adicionado à sua caixinha e deduzido do saldo geral." : "O valor será retirado da caixinha e adicionado ao saldo geral."}</Typography>
                    </InfoBox>
                    <TextField label="Valor" value={formatCurrency(formData.amount)} onChange={(e) => onChange("amount", Number(e.target.value.replace(/\D/g, "")) / 100)} fullWidth required autoFocus />
                    <InputWithCounter label="Motivo (Opcional)" value={formData.description || ""} onChange={(e) => onChange("description", e.target.value)} maxLength={100} />
                </FormContainer>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={onSave} variant="contained" color={colorType}>Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default VaultTransactionModal;