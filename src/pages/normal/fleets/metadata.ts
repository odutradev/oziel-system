import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Frotas", url: "/dashboard/maintenance/fleets" }
    ],
    pageTitle: "Gestão de Frotas"
};

export default metadata;