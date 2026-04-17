import { Typography, Button, IconButton, Box } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

import { Container, Header, HeaderInfo, Grid, Card, CardHeader, CardContent, InfoRow, CardActions, StatusChip, Footer } from "./styles";
import { CONTRACT_TYPE_TRANSLATIONS, CONTRACT_STATUS_TRANSLATIONS } from "@utils/types/models/contract";
import { formatCurrency, formatDate } from "@utils/formatters";
import Pagination from "@components/pagination";
import NoData from "@components/noData";

import type { ContractStatusType } from "@utils/types/models/contract";
import type { ContractGridProps } from "./types";

const getStatusColor = (status?: ContractStatusType) => {
    if (status === "ACTIVE") return "success";
    if (status === "REGULAR") return "info";
    if (status === "IRREGULAR") return "warning";
    if (status === "INACTIVE") return "error";
    return "default";
};

const ContractGrid = ({ contracts, meta, onEdit, onDelete, onPaginationChange, onCreate }: ContractGridProps) => {
    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <Typography variant="h6" fontWeight={600}>Contratos</Typography>
                    <Typography variant="body2" color="text.secondary">Total: {meta.total}</Typography>
                </HeaderInfo>
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={onCreate}>
                    Novo Contrato
                </Button>
            </Header>

            {contracts.length === 0 ? (
                <NoData message="Nenhum contrato encontrado" />
            ) : (
                <Grid>
                    {contracts.map((contract) => (
                        <Card key={contract._id}>
                            <CardHeader>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={700}>{contract.code}</Typography>
                                    <Typography variant="caption" color="text.secondary">{CONTRACT_TYPE_TRANSLATIONS[contract.type]}</Typography>
                                </Box>
                                <StatusChip label={CONTRACT_STATUS_TRANSLATIONS[contract.status]} variantcolor={getStatusColor(contract.status)} size="small" />
                            </CardHeader>
                            <CardContent>
                                <InfoRow>
                                    <Typography variant="body2" color="text.secondary">Data:</Typography>
                                    <Typography variant="body2" fontWeight={500}>{formatDate(contract.contractDate as string)}</Typography>
                                </InfoRow>
                                <InfoRow>
                                    <Typography variant="body2" color="text.secondary">Previsão:</Typography>
                                    <Typography variant="body2" fontWeight={500}>{contract.deliveryForecast ? formatDate(contract.deliveryForecast as string) : "-"}</Typography>
                                </InfoRow>
                                <InfoRow>
                                    <Typography variant="body2" color="text.secondary">Valor Total:</Typography>
                                    <Typography variant="body2" fontWeight={600} color="primary.main">{formatCurrency(contract.totalValue)}</Typography>
                                </InfoRow>
                            </CardContent>
                            <CardActions>
                                <IconButton size="small" onClick={() => onEdit(contract)} color="primary" title="Editar">
                                    <Edit fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={() => contract._id && onDelete(contract._id)} color="error" title="Excluir">
                                    <Delete fontSize="small" />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            )}

            {contracts.length > 0 && (
                <Footer>
                    <Pagination totalItems={meta.total} currentPage={meta.page} rowsPerPage={meta.limit} onPaginationChange={onPaginationChange} />
                </Footer>
            )}
        </Container>
    );
};

export default ContractGrid;