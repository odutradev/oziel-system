import { Typography, Button, IconButton, Box, Menu, MenuItem, ListItemIcon, ListItemText, Chip } from "@mui/material";
import { Add, Edit, Delete, MoreVert, Event, EventAvailable, Payments } from "@mui/icons-material";
import { useState, MouseEvent } from "react";

import { Container, Header, HeaderInfo, Grid, Card, CardHeader, ChipsWrapper, CardContent, InfoRow, InfoTextWrapper, StatusChip, Footer } from "./styles";
import { CONTRACT_TYPE_TRANSLATIONS, CONTRACT_STATUS_TRANSLATIONS } from "@utils/types/models/contract";
import { formatCurrency, formatDate } from "@utils/formatters";
import Pagination from "@components/pagination";
import NoData from "@components/noData";

import type { ContractModelType, ContractStatusType } from "@utils/types/models/contract";
import type { ContractGridProps } from "./types";

const getStatusColor = (status?: ContractStatusType) => {
    if (status === "ACTIVE") return "success";
    if (status === "REGULAR") return "info";
    if (status === "IRREGULAR") return "warning";
    if (status === "INACTIVE") return "error";
    return "default";
};

const ContractGrid = ({ contracts, meta, onEdit, onDelete, onPaginationChange, onCreate }: ContractGridProps) => {
    const [selectedContract, setSelectedContract] = useState<ContractModelType | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: MouseEvent<HTMLElement>, contract: ContractModelType) => {
        event.stopPropagation();
        setSelectedContract(contract);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = (event?: MouseEvent<HTMLElement>) => {
        if (event) event.stopPropagation();
        setSelectedContract(null);
        setAnchorEl(null);
    };

    const handleEditAction = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        if (selectedContract) onEdit(selectedContract);
        handleCloseMenu();
    };

    const handleDeleteAction = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        if (selectedContract?._id) onDelete(selectedContract._id);
        handleCloseMenu();
    };

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
                        <Card key={contract._id} onClick={() => onEdit(contract)}>
                            <CardHeader>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
                                        {contract.code}
                                    </Typography>
                                    <ChipsWrapper>
                                        <Chip label={CONTRACT_TYPE_TRANSLATIONS[contract.type]} size="small" variant="outlined" color="primary" />
                                        <StatusChip label={CONTRACT_STATUS_TRANSLATIONS[contract.status]} variantcolor={getStatusColor(contract.status)} size="small" />
                                    </ChipsWrapper>
                                </Box>
                                <IconButton size="small" onClick={(e) => handleOpenMenu(e, contract)}>
                                    <MoreVert fontSize="small" />
                                </IconButton>
                            </CardHeader>
                            <CardContent>
                                <InfoRow>
                                    <Event />
                                    <InfoTextWrapper>
                                        <Typography variant="caption" color="text.secondary" lineHeight={1.2}>Data do Contrato</Typography>
                                        <Typography variant="body2" fontWeight={500}>{formatDate(contract.contractDate as string)}</Typography>
                                    </InfoTextWrapper>
                                </InfoRow>
                                {contract.deliveryForecast && (
                                    <InfoRow>
                                        <EventAvailable />
                                        <InfoTextWrapper>
                                            <Typography variant="caption" color="text.secondary" lineHeight={1.2}>Previsão de Entrega</Typography>
                                            <Typography variant="body2" fontWeight={500}>{formatDate(contract.deliveryForecast as string)}</Typography>
                                        </InfoTextWrapper>
                                    </InfoRow>
                                )}
                                <InfoRow sx={{ mt: 1, justifyContent: "space-between" }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Payments color="primary" />
                                        <Typography variant="body2" color="text.secondary" fontWeight={500}>Valor Total</Typography>
                                    </Box>
                                    <Typography variant="subtitle1" fontWeight={700} color="primary.main">
                                        {formatCurrency(contract.totalValue)}
                                    </Typography>
                                </InfoRow>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            )}

            {contracts.length > 0 && (
                <Footer>
                    <Pagination totalItems={meta.total} currentPage={meta.page} rowsPerPage={meta.limit} onPaginationChange={onPaginationChange} />
                </Footer>
            )}

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} onClick={(e) => e.stopPropagation()}>
                <MenuItem onClick={handleEditAction}>
                    <ListItemIcon><Edit fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText>Editar</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDeleteAction}>
                    <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
                    <ListItemText>Excluir</ListItemText>
                </MenuItem>
            </Menu>
        </Container>
    );
};

export default ContractGrid;