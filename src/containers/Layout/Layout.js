import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import routes from "../../routes";

import Sidebar from "../Sidebar";
import Header from "../Header/Header";
import Historybar from "../History/Historybar";
import Main from "../Main/Main";
import { SidebarContext } from "../../context/SidebarContext";
import Loader from "../../components/Loader/Loader";

const Page404 = lazy(() => import("../../pages/404"));

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);

  let location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-secondary-700 overflow-hidden text-white`}>
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<Loader />}>
            <Switch>
              {routes.map((route, i) => {
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
    </div>
  );
}

export default Layout;
