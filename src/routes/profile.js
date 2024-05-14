/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
import { lazy } from "react";


const myTracks = lazy(() => import("../pages/Profile/MyTracks"));
const favoriteTracks = lazy(() => import("../pages/Profile/FavouriteTrack"));
const Upload = lazy(() => import("../pages/Profile/Upload"));

const routes = [
  {
    path: "/",
    auth: true,
    component: myTracks,
  },,
  {
    path: "/tracks",
    auth: true,
    component: myTracks,
  },
  {
    path: "/favorite",
    auth: true,
    component: favoriteTracks,
  },
  {
    path: "/upload",
    auth: true,
    component: Upload,
  },
];

export default routes;
