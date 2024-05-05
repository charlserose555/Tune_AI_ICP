/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home"));
const Genres = lazy(() => import("../pages/Genres/Genres"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const GenresDetail = lazy(() => import("../pages/Home/GenresDetail"));
const Library = lazy(() => import("../pages/Library/Library"));
const Manage = lazy(() => import("../pages/Manage/Manage"));

const routes = [
  {
    path: "/home",
    icon: "./home.svg",
    name: "Home",
    role: "user",
    component: Home,
  },
  {
    path: "/genres",
    icon: "GenresIcon",
    name: "Genres",
    role: "user",
    component: Genres,
  },
  {
    path: "/library",
    icon: "LibarayIcon",
    name: "My Library",
    auth: true,
    role: "user",
    component: Library,
  },
  {
    path: "/manage",
    icon: "ManageIcon",
    name: "Manage",
    auth: true,
    role: "admin",
    component: Manage,
  },
  {
    path: "/profile",
    auth: true,
    role: "user",
    component: Profile,
  },
  {
    path: "/genres/:id",
    role: "user",
    component: GenresDetail,
  }
];

export default routes;
