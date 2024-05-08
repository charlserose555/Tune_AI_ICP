/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */

const routes = [
  {
    path: "/app/home",
    icon: "./home.svg",
    name: "Home",
    role: "user",
  },
  {
    path: "/app/library",
    icon: "./home.svg",
    name: "Library",
    role: "user",
    auth: true, 
  },
  // {
  //   icon: "CasinoIcon",
  //   name: "Library",
  //   path: "/app/library",
  //   routes: [
  //     // submenu
  //     {
  //       path: "/app/casino/all-games",
  //       name: "All Games",
  //     },
  //     {
  //       path: "/app/casino/livecasino",
  //       name: "Live Casino",
  //     },
  //     {
  //       path: "/app/casino/poker",
  //       name: "Poker",
  //     },
  //     {
  //       path: "/app/casino/video-slots",
  //       name: "Video Slots",
  //     },
  //     {
  //       path: "/app/casino/table-games",
  //       name: "Table Games",
  //     },
  //   ],
  // },
];

export default routes;
