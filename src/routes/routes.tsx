import { Navigate } from "react-router-dom";

import RecurringTransactions from "@pages/normal/recurringTransactions";
import ContractsManagement from "@pages/normal/contracts";
import MarketingRequests from "@pages/admin/marketingRequests";
import MachineOperations from "@pages/normal/machineOperations";
import EmailTemplateEdit from "@pages/admin/editTemplate";
import AccountBlocked from "@pages/normal/accountBlocked";
import InitialRoute from "@routes/components/initialRoute";
import MonthlyClosing from "@pages/normal/monthlyClosing";
import TicketsManagement from "@pages/normal/itTickets";
import PasswordReset from "@pages/normal/passwordReset";
import EditHrMember from "@pages/normal/editHrMember";
import EmailsManagement from "@pages/admin/emails";
import SendBulkEmail from "@pages/admin/sendBulk";
import UsersManagement from "@pages/admin/users";
import PwaInstall from "@pages/normal/pwaInstall";
import Dashboard from "@pages/normal/dashboard";
import Operators from "@pages/normal/operators";
import HrMembers from "@pages/normal/hrMembers";
import Treasury from "@pages/normal/treasury";
import NotFound from "@pages/normal/notFound";
import UserEdit from "@pages/admin/editUser";
import Profile from "@pages/normal/profile";
import SystemLogs from "@pages/admin/logs";
import Logout from "@pages/normal/logout";
import SignIn from "@pages/normal/signIn";
import SignUp from "@pages/normal/signUp";
import Fleets from "@pages/normal/fleets";
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
            ['/contracts', <ContractsManagement />],
            ['/tickets', <TicketsManagement />],
            ['/maintenance/operations', <MachineOperations />],
            ['/maintenance/monthly-closing', <MonthlyClosing />],
            ['/maintenance/operators', <Operators />],
            ['/maintenance/fleets', <Fleets />],
            ['/recurring-transactions', <RecurringTransactions />],
            ['/profile', <Profile />],
            ['/logs', <Logs />],
        ]
    },
    {
        path: "/dashboard/admin",
        privateRoute: true,
        routes: [
            ['/marketing', <MarketingRequests />],
            ['/users', <UsersManagement />],
            ['/users/edit/:userID', <UserEdit />],
            ['/emails', <EmailsManagement />],
            ['/emails/edit/:templateID', <EmailTemplateEdit />],
            ['/emails/send-bulk', <SendBulkEmail />],
            ['/logs', <SystemLogs />],
        ]
    },
];

export default routes;