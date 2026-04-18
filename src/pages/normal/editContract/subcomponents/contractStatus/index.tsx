import { CONTRACT_STATUS_ARRAY, CONTRACT_STATUS_TRANSLATIONS, CONTRACT_SITUATION_ARRAY, CONTRACT_SITUATION_TRANSLATIONS } from "@utils/types/models/contract";
import ToggleGroup from "@components/toggleGroup";
import EditSection from "@components/editSection";
import ConfigCard from "@components/configCard";
import { StatusContainer } from "./styles";

import type { ContractStatusProps } from "./types";

const ContractStatus = ({ formData, onChange }: ContractStatusProps) => {
    const statusOptions = CONTRACT_STATUS_ARRAY.map(status => ({
        value: status,
        label: CONTRACT_STATUS_TRANSLATIONS[status]
    }));

    const situationOptions = CONTRACT_SITUATION_ARRAY.map(situation => ({
        value: situation,
        label: CONTRACT_SITUATION_TRANSLATIONS[situation]
    }));

    return (
        <EditSection title="Vigência e Regularidade">
            <StatusContainer>
                <ConfigCard title="Status de Vigência" active={formData.status === "ACTIVE"}>
                    <ToggleGroup
                        options={statusOptions}
                        value={formData.status}
                        exclusive
                        onChange={(_, value) => value && onChange("status", value)}
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                </ConfigCard>
                <ConfigCard title="Situação Administrativa" active={formData.situation === "REGULAR"}>
                    <ToggleGroup
                        options={situationOptions}
                        value={formData.situation}
                        exclusive
                        onChange={(_, value) => value && onChange("situation", value)}
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                </ConfigCard>
            </StatusContainer>
        </EditSection>
    );
};

export default ContractStatus;