/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home"));
const Genres = lazy(() => import("../pages/Track/Tracks"));
const Artist = lazy(() => import("../pages/Profile/Artist"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const TrackDetail = lazy(() => import("../pages/Home/TrackDetail"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
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
    path: "/profile",
    icon: "LibarayIcon",
    name: "Profile",
    auth: true,
    role: "user",
    component: Profile,
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
    path: "/artist/id=:id",
    role: "user",
    component: Artist,
  },
  {
    path: "/track/id=:id",
    role: "user",
    component: TrackDetail,
  }
];

export default routes;
