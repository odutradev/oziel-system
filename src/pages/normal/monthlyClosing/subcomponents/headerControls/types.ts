export interface HeaderControlsProps {
    handleChangeMonth: (direction: "prev" | "next") => void;
    selectedDate: Date;
    handlePrint: () => void;
}