import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Ativos e Operadores", url: "/dashboard/maintenance/machine-resources" }
    ],
    pageTitle: "Recursos de Manutenção",
    padding: 3
};

export default metadata;