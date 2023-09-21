import { Suspense, lazy } from "react";
// components
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const PageLogin = Loadable(
  lazy(() => import("../pages/auth/Login/Login"))
);
export const Page404 = Loadable(lazy(() => import("../pages/Page404")));

export const PageRegister = Loadable(
  lazy(() => import("../pages/auth/Register/Register"))
);
export const PageOverView = Loadable(lazy(() => import("../pages/overview")));
export const PageConversation = Loadable(
  lazy(() => import("../pages/conversation"))
);
export const PageTraffic = Loadable(lazy(() => import("../pages/traffic")));
export const PageTop = Loadable(lazy(() => import("../pages/top")));
export const PageLocation = Loadable(lazy(() => import("../pages/location")));
export const PageSystems = Loadable(lazy(() => import("../pages/systems")));
export const Pagetalkers = Loadable(lazy(() => import("../pages/talkers")));
export const PageAnalytics = Loadable(lazy(() => import("../pages/analytics")));
