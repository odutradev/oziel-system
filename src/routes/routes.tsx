import { Navigate } from "react-router-dom";

import RecurringTransactions from "@pages/normal/recurringTransactions";
import EditMachineResource from "@pages/normal/editMachineResource";
import ContractsDashboard from "@pages/normal/contractsDashboard";
import MeetingMinutes from "@pages/admin/meetingMinutes";
import ContractsManagement from "@pages/normal/contracts";
import MachineOperations from "@pages/normal/machineOperations";
import MachineResources from "@pages/normal/machineResources";
import MarketingManagement from "@pages/admin/marketing";
import EmailTemplateEdit from "@pages/admin/editTemplate";
import AccountBlocked from "@pages/normal/accountBlocked";
import InitialRoute from "@routes/components/initialRoute";
import TicketsManagement from "@pages/normal/itTickets";
import MonthlyClosing from "@pages/normal/monthlyClosing";
import PasswordReset from "@pages/normal/passwordReset";
import EditMarketing from "@pages/admin/editMarketing";
import EditHrMember from "@pages/normal/editHrMember";
import EmailsManagement from "@pages/admin/emails";
import UsersManagement from "@pages/admin/users";
import EditContract from "@pages/normal/editContract";
import SendBulkEmail from "@pages/admin/sendBulk";
import EditMinute from "@pages/admin/editMinute";
import EditTicket from "@pages/normal/editTicket";
import PwaInstall from "@pages/normal/pwaInstall";
import HrMembers from "@pages/normal/hrMembers";
import Dashboard from "@pages/normal/dashboard";
import Treasury from "@pages/normal/treasury";
import NotFound from "@pages/normal/notFound";
import UserEdit from "@pages/admin/editUser";
import SystemLogs from "@pages/admin/logs";
import Profile from "@pages/normal/profile";
import SignIn from "@pages/normal/signIn";
import SignUp from "@pages/normal/signUp";
import Logout from "@pages/normal/logout";
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
            ['/tickets/new', <EditTicket />],
            ['/tickets/edit/:ticketID', <EditTicket />],
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
            ['/secretary/minutes', <MeetingMinutes />],
            ['/secretary/minutes/new', <EditMinute />],
            ['/secretary/minutes/edit/:minuteID', <EditMinute />],
            ['/logs', <SystemLogs />],
        ]
    },
];

export default routes;