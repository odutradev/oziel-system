import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Secretaria", url: "" },
        { name: "Atas de Reunião", url: "/dashboard/admin/secretary/minutes" }
    ],
    pageTitle: "Gestão de Atas"
};

export default metadata;