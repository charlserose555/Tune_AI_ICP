import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Home = lazy(() => import("../pages/Home/Home"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/geners",
        component: Home,
    },
    {
        path: "/favourites",
        component: Home,
    },
];

export default routes;
