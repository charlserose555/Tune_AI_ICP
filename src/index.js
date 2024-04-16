import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/tailwind.output.css";
import "./assets/css/global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext.js";
import { Windmill } from "@windmill/react-ui";
import * as serviceWorker from "./serviceWorker.js";
import _theme from "./theme.js";
import Loadable from "react-loadable";
import "./assets/css/css/Plus.css";
import { APIProvider } from "./context/ApiContext.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store/index.js";
import AppLoader from "./components/Loader/AppLoader.js";

const Application = Loadable.Map({
  loader: {
    ui: () => import("./App.js"),
    data: () =>
      new Promise((r) => setTimeout(r, 2100)),
  },
  loading: AppLoader,
  render(loaded, props) {
    let Dashboard = loaded.ui.default;
    let data = loaded.data;
    return <Dashboard {...props} data={data} />;
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SidebarProvider>
    <Provider store={store}>
      <APIProvider>
        <Router>
          <Suspense fallback={<AppLoader isPercentage={false}/>}>
            <Windmill theme={_theme} dark>
              <Application />
            </Windmill>
          </Suspense>
        </Router>
      </APIProvider>
    </Provider>
  </SidebarProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
