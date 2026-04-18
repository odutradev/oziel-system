import { formatInputDate } from "@utils/formatters";

import type { ContractFormData } from "../types";

export const defaultContractFormData: ContractFormData = {
    code: "",
    type: "",
    status: "ACTIVE",
    situation: "REGULAR",
    contractDate: formatInputDate(new Date()),
    deliveryForecast: "",
    endDate: "",
    totalValue: 0,
    totalSalePrice: 0,
    detailsMarkdown: ""
};