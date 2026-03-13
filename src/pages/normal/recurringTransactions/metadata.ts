import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Agendamentos", url: "/dashboard/recurring-transactions" }
    ],
    pageTitle: "Transações Agendadas"
};

export default metadata;