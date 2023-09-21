import { Navigate, useRoutes } from "react-router-dom";
// auth
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
// layouts
import CompactLayout from "../layouts/compact";
import DashboardLayout from "../layouts/dashboard";
// config
import { PATH_AFTER_LOGIN } from "../config-global";
//
import {
  PageOverView,
  PageLogin,
  PageRegister,
  Page404,
  PageConversation,
  PageAnalytics,
  PageLocation,
  PageSystems,
  Pagetalkers,
  PageTop,
  PageTraffic,
} from "./elements";
import AuthLayout from "../layouts/auth/AuthLayout";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: "overview", element: <PageOverView /> },
        { path: "conversation", element: <PageConversation /> },
        { path: "analytics", element: <PageAnalytics /> },
        { path: "systems", element: <PageSystems /> },
        { path: "location", element: <PageLocation /> },
        { path: "traffic", element: <PageTraffic /> },
        { path: "talkers", element: <Pagetalkers /> },
        { path: "top", element: <PageTop /> },
      ],
    },
    {
      path: "/auth",
      element: (
        <GuestGuard>
          <AuthLayout />
        </GuestGuard>
      ),
      children: [
        { element: <Navigate to={"/auth/login"} replace />, index: true },
        {
          path: "login",
          element: <PageLogin />,
        },
        {
          path: "register",
          element: <PageRegister />,
        },
        // {
        //   path: "forget",
        //   element: <PageForgetPassword />,
        // },
        // {
        //   path: "verify",
        //   element: <PageVerifyCode />,
        // },
        // {
        //   path: "reset",
        //   element: <PageResetPassword />,
        // },
      ],
    },

    {
      element: <CompactLayout />,
      children: [{ path: "404", element: <Page404 /> }],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
