import React, { lazy, useEffect, useMemo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useLocation } from "react-router-dom";

import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";

import { store, persister, useSelector, dispatch } from "./store";

import { APIProvider } from "./context/ApiContext";
import { Toaster } from "react-hot-toast";
import { initFlowbite } from "flowbite";
import Alert from "./components/Alert/Alert";
import { AgentProvider } from "@ic-reactor/react"

const Layout = lazy(() => import("./pages/Layout/Layout"));
const ModalLayout = lazy(() => import("./pages/Modal/ModalLayout"))

require("flowbite/dist/flowbite.js");

function App() {
  useEffect(() => {
    setTimeout(() => {
      initFlowbite();
    }, 2000);
  }, []);


  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <AgentProvider withDevtools withLocalEnv> 
            <APIProvider>
              <ModalLayout/>
              <AccessibleNavigationAnnouncer />
              <Switch>
                {/* Place new routes over this */}
                <Route index path="/app" component={Layout} />
                {/* If you have an index page, you can remothis Redirect */}
                <Redirect exact from="/" to="/app/home" />              
              </Switch>
              <Alert/>
              <Toaster
                position="top-right"
                reverseOrder={false}
              />
            </APIProvider>
          </AgentProvider>
        </PersistGate>
      </Provider>
  );
}

export default App;
