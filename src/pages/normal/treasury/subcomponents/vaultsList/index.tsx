import { Typography, IconButton, Tooltip } from "@mui/material";
import { AddCircle, RemoveCircle, Edit } from "@mui/icons-material";

import { VaultsGrid, VaultCard, CardHeader, CardBody, CardFooter, ProgressWrapper, StyledLinearProgress, ActionGroup } from "./styles";
import { formatCurrency } from "@utils/formatters";
import NoData from "@components/noData";

import type { VaultsListProps } from "./types";

const VaultsList = ({ vaults, onEdit, onDeposit, onWithdraw }: VaultsListProps) => {
    if (!vaults || vaults.length === 0) return <NoData message="Nenhuma caixinha criada ainda." height={300} />;

    return (
        <VaultsGrid>
            {vaults.map((vault) => {
                const hasGoal = vault.goal && vault.goal > 0;
                const progress = hasGoal ? Math.min((vault.balance / (vault.goal ?? 1)) * 100, 100) : 0;

                return (
                    <VaultCard key={vault._id} elevation={1}>
                        <CardHeader>
                            <Typography variant="h6" fontWeight={600}>{vault.name}</Typography>
                            <Tooltip title="Editar">
                                <IconButton size="small" onClick={() => onEdit(vault)}><Edit fontSize="small" /></IconButton>
                            </Tooltip>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="body2" color="text.secondary" mb={2}>{vault.description || "Sem descrição"}</Typography>
                            <Typography variant="h4" color="primary" fontWeight={700}>{formatCurrency(vault.balance)}</Typography>
                            {hasGoal && (
                                <ProgressWrapper>
                                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                                        <Typography variant="caption" color="text.secondary">Progresso</Typography>
                                        <Typography variant="caption" fontWeight={600}>{progress.toFixed(1)}% de {formatCurrency(vault.goal ?? 0)}</Typography>
                                    </Box>
                                    <StyledLinearProgress variant="determinate" value={progress} />
                                </ProgressWrapper>
                            )}
                        </CardBody>
                        <CardFooter>
                            <ActionGroup>
                                <Button variant="outlined" color="error" startIcon={<RemoveCircle />} onClick={() => vault._id && onWithdraw(vault._id)} fullWidth disabled={vault.balance <= 0}>Resgatar</Button>
                                <Button variant="contained" color="success" startIcon={<AddCircle />} onClick={() => vault._id && onDeposit(vault._id)} fullWidth>Guardar</Button>
                            </ActionGroup>
                        </CardFooter>
                    </VaultCard>
                );
            })}
        </VaultsGrid>
    );
};

export default VaultsList;