import { ChevronRight, ChevronLeft, Print } from "@mui/icons-material";
import { Typography, IconButton, Button } from "@mui/material";

import { ControlsWrapper, MonthSelector, ActionButtons } from "./styles";

import type { HeaderControlsProps } from "./types";

const HeaderControls = ({ selectedDate, handleChangeMonth, handlePrint }: HeaderControlsProps) => {
    const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(selectedDate);

    return (
        <ControlsWrapper>
            <MonthSelector>
                <IconButton onClick={() => handleChangeMonth("prev")} size="small"><ChevronLeft /></IconButton>
                <Typography variant="h6" textTransform="capitalize">{monthName}</Typography>
                <IconButton onClick={() => handleChangeMonth("next")} size="small"><ChevronRight /></IconButton>
            </MonthSelector>
            <ActionButtons>
                <Button variant="outlined" color="primary" startIcon={<Print />} onClick={handlePrint}>
                    Imprimir Relatório
                </Button>
            </ActionButtons>
        </ControlsWrapper>
    );
};

export default HeaderControls;