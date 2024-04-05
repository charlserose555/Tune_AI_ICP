/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));

const routes = [
  {
    path: "/home",
    icon: "./home.svg",
    name: "Home",
    component: Home,
  },
  {
    path: "/Geners",
    icon: "GenersIcon",
    name: "Geners",
    component: Home,
  },
  {
    path: "/Favorites",
    icon: "FavoritesIcon",
    name: "Favorites",
    component: Home,
  }
];

export default routes;
