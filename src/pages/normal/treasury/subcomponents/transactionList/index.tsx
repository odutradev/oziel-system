import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Typography } from "@mui/material";
import { CheckCircle, Delete, Edit } from "@mui/icons-material";

import { ListWrapper, StatusChip, TypeChip, ActionGroup } from "./styles";
import { formatCurrency, formatDate } from "@utils/formatters";
import NoData from "@components/noData";

import type { TransactionListProps } from "./types";

const TransactionList = ({ transactions, onEdit, onDelete, onConfirm }: TransactionListProps) => {
    if (!transactions || transactions.length === 0) {
        return <NoData message="Nenhuma transação encontrada neste período." height={300} />;
    }

    return (
        <ListWrapper component="section">
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell><Typography fontWeight={600}>Descrição</Typography></TableCell>
                        <TableCell><Typography fontWeight={600}>Categoria</Typography></TableCell>
                        <TableCell><Typography fontWeight={600}>Data</Typography></TableCell>
                        <TableCell><Typography fontWeight={600}>Valor</Typography></TableCell>
                        <TableCell><Typography fontWeight={600}>Tipo</Typography></TableCell>
                        <TableCell><Typography fontWeight={600}>Status</Typography></TableCell>
                        <TableCell align="right"><Typography fontWeight={600}>Ações</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((t) => (
                        <TableRow key={t._id} hover>
                            <TableCell>{t.title}</TableCell>
                            <TableCell>{t.category || "-"}</TableCell>
                            <TableCell>{formatDate(t.date)}</TableCell>
                            <TableCell>
                                <Typography color={t.type === "INCOME" ? "success.main" : "error.main"} fontWeight={600}>
                                    {formatCurrency(t.amount)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <TypeChip label={t.type === "INCOME" ? "Entrada" : "Saída"} varianttype={t.type} size="small" />
                            </TableCell>
                            <TableCell>
                                <StatusChip label={t.status === "CONFIRMED" ? "Confirmado" : "Pendente"} variantcolor={t.status === "CONFIRMED" ? "success" : "warning"} size="small" />
                            </TableCell>
                            <TableCell align="right">
                                <ActionGroup justifyContent="flex-end">
                                    {t.status === "PENDING" && (
                                        <IconButton size="small" color="success" onClick={() => t._id && onConfirm(t._id)} title="Confirmar">
                                            <CheckCircle fontSize="small" />
                                        </IconButton>
                                    )}
                                    <IconButton size="small" color="primary" onClick={() => onEdit(t)} title="Editar">
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => t._id && onDelete(t._id)} title="Excluir">
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </ActionGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ListWrapper>
    );
};

export default TransactionList;