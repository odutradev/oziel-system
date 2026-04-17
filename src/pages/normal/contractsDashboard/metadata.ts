import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Contratos", url: "/dashboard/contracts" },
        { name: "Métricas", url: "/dashboard/contracts/dashboard" }
    ],
    pageTitle: "Dashboard de Contratos"
};

export default metadata;