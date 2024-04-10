import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Login = lazy(() => import("../pages/Auth/Login"));
const Profile = lazy(() => import("../pages/Profile/Profile"));

const routes = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/profile",
        component: Profile,
    },
];

export default routes;
