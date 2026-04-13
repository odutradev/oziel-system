import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Operações", url: "/dashboard/maintenance/operations" },
        { name: "Fechamento Mensal", url: "/dashboard/maintenance/monthly-closing" }
    ],
    pageTitle: "Fechamento Mensal de Operações"
};

export default metadata;