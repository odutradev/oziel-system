import { Navigate } from "react-router-dom";

import InitialRoute from "@routes/components/initialRoute";

import EmailTemplateEdit from "@pages/admin/editTemplate";
import EmailsManagement from "@pages/admin/emails";
import SendBulkEmail from "@pages/admin/sendBulk";
import UsersManagement from "@pages/admin/users";
import UserEdit from "@pages/admin/editUser";
import SystemLogs from "@pages/admin/logs";

import AccountBlocked from "@pages/normal/accountBlocked";
import PasswordReset from "@pages/normal/passwordReset";
import PwaInstall from "@pages/normal/pwaInstall";
import Dashboard from "@pages/normal/dashboard";
import Treasury from "@pages/normal/treasury";
import NotFound from "@pages/normal/notFound";
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
            ['/pwa-install', <PwaInstall />],
            ['/treasury', <Treasury />],
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