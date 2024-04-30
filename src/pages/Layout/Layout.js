import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import {sidebar} from "../../routes";

import Sidebar from "../Sidebar";
import Historybar from "../History/Historybar";
import Main from "../Main/Main";
import { SidebarContext } from "../../context/SidebarContext";
import AudioPlayer from "../Player/AudioPlayer";
import { useState } from "react";
import PageLoader from "../../components/Loader/PageLoader";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";

const Page404 = lazy(() => import("../404"));

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const [delayed, setDelayed] = useState(true);

  let location = useLocation();

  useEffect(() => {
    // Simulating a delay of 2 seconds
    const timer = setTimeout(() => {
      setDelayed(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-secondary-700 flex-row text-white`}>
      <Sidebar />
      <div className="flex flex-col flex-1 w-full overflow-y-auto y-scrollable-tag">
        <Main>
          <LoadingOverlay/>
          <Suspense fallback={<PageLoader />}>
            <Switch>
              {sidebar.map((route, i) => {
                return route.component ? (
                <Route
                    key={i}
                    exact={true}
                    path={`/app${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
      <Historybar/>

      <AudioPlayer/>
    </div>
  );
}

export default Layout;
