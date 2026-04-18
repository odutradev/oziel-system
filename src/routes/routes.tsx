import { Navigate } from "react-router-dom";

import EditMachineResource from "@pages/normal/editMachineResource";
import RecurringTransactions from "@pages/normal/recurringTransactions";
import ContractsDashboard from "@pages/normal/contractsDashboard";
import ContractsManagement from "@pages/normal/contracts";
import MachineOperations from "@pages/normal/machineOperations";
import MachineResources from "@pages/normal/machineResources";
import MarketingManagement from "@pages/admin/marketing";
import EmailTemplateEdit from "@pages/admin/editTemplate";
import AccountBlocked from "@pages/normal/accountBlocked";
import InitialRoute from "@routes/components/initialRoute";
import MonthlyClosing from "@pages/normal/monthlyClosing";
import TicketsManagement from "@pages/normal/itTickets";
import PasswordReset from "@pages/normal/passwordReset";
import EditMarketing from "@pages/admin/editMarketing";
import EditHrMember from "@pages/normal/editHrMember";
import EditContract from "@pages/normal/editContract";
import EmailsManagement from "@pages/admin/emails";
import SendBulkEmail from "@pages/admin/sendBulk";
import UsersManagement from "@pages/admin/users";
import PwaInstall from "@pages/normal/pwaInstall";
import Dashboard from "@pages/normal/dashboard";
import HrMembers from "@pages/normal/hrMembers";
import Treasury from "@pages/normal/treasury";
import NotFound from "@pages/normal/notFound";
import UserEdit from "@pages/admin/editUser";
import Profile from "@pages/normal/profile";
import SystemLogs from "@pages/admin/logs";
import Logout from "@pages/normal/logout";
import SignIn from "@pages/normal/signIn";
import SignUp from "@pages/normal/signUp";
import Logs from "@pages/normal/viewLogs";

const routes = [
    {
        path: "/",
        privateRoute: false,
        routes: [
            ["*", <Navigate to="/not-found" replace/>],
            ['/account-blocked', <AccountBlocked />],
            ['/password-reset', <PasswordReset />],
            ['/not-found', <NotFound />],
            ['/signin', <SignIn />],
            ['/signup', <SignUp />],
            ['/logout', <Logout />],
            ['', <InitialRoute />],
        ]
    },
    {
        path: "/dashboard",
        privateRoute: true,
        routes: [
            ['/general', <Dashboard />],
            ['/hr/members', <HrMembers />],
            ['/hr/members/new', <EditHrMember />],
            ['/hr/members/edit/:memberID', <EditHrMember />],
            ['/pwa-install', <PwaInstall />],
            ['/treasury', <Treasury />],
            ['/contracts/dashboard', <ContractsDashboard />],
            ['/contracts', <ContractsManagement />],
            ['/contracts/new', <EditContract />],
            ['/contracts/edit/:contractID', <EditContract />],
            ['/tickets', <TicketsManagement />],
            ['/maintenance/operations', <MachineOperations />],
            ['/maintenance/monthly-closing', <MonthlyClosing />],
            ['/maintenance/machine-resources', <MachineResources />],
            ['/maintenance/machine-resources/new/:type', <EditMachineResource />],
            ['/maintenance/machine-resources/edit/:type/:resourceID', <EditMachineResource />],
            ['/recurring-transactions', <RecurringTransactions />],
            ['/profile', <Profile />],
            ['/logs', <Logs />],
        ]
    },
    {
        path: "/dashboard/admin",
        privateRoute: true,
        routes: [
            ['/users', <UsersManagement />],
            ['/users/edit/:userID', <UserEdit />],
            ['/emails', <EmailsManagement />],
            ['/emails/edit/:templateID', <EmailTemplateEdit />],
            ['/emails/send-bulk', <SendBulkEmail />],
            ['/marketing', <MarketingManagement />],
            ['/marketing/new', <EditMarketing />],
            ['/marketing/edit/:itemID', <EditMarketing />],
            ['/logs', <SystemLogs />],
        ]
    },
];

export default routes;