import { Navigate } from "react-router-dom";

import RecurringTransactions from "@pages/normal/recurringTransactions";
import InitialRoute from "@routes/components/initialRoute";
import EmailTemplateEdit from "@pages/admin/editTemplate";
import AccountBlocked from "@pages/normal/accountBlocked";
import PasswordReset from "@pages/normal/passwordReset";
import EmailsManagement from "@pages/admin/emails";
import SendBulkEmail from "@pages/admin/sendBulk";
import UsersManagement from "@pages/admin/users";
import PwaInstall from "@pages/normal/pwaInstall";
import Operators from "@pages/normal/operators";
import Dashboard from "@pages/normal/dashboard";
import SystemLogs from "@pages/admin/logs";
import Treasury from "@pages/normal/treasury";
import NotFound from "@pages/normal/notFound";
import UserEdit from "@pages/admin/editUser";
import Profile from "@pages/normal/profile";
import Fleets from "@pages/normal/fleets";
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
            ['/pwa-install', <PwaInstall />],
            ['/treasury', <Treasury />],
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