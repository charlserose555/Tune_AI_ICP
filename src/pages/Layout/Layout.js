import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import {sidebar} from "../../routes";

import Sidebar from "../Sidebar";
import Historybar from "../History/Historybar";
import Main from "../Main/Main";
import { SidebarContext } from "../../context/SidebarContext";
import Loader from "../../components/Loader/Loader";
import { NextIcon, PreviousIcon, RandomIcon, RepeatIcon, ResumeIcon, VolumeIcon } from "../../icons";
import { Slider } from "@material-tailwind/react";

const Page404 = lazy(() => import("../404"));

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
      className={`flex h-screen bg-secondary-700 flex-row text-white`}>
      <Sidebar />
      <div className="flex flex-col flex-1 w-full max-h-[900px] overflow-y-auto y-scrollable-tag">
        <Main>
          <Suspense fallback={<Loader />}>
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

      <div className="absolute font-plus text-white bottom-0 left-0 w-full h-[96px] z-40">
        <div className="flex justify-start items-center w-full bg-primary-700 w-fixed gap-[10px] py-[20px] px-[30px]">
          <div className="flex justify-start items-center w-full">
            <div className="flex flex-row justify-start items-center gap-[6px] w-[240px]">
                <img src="/demo/assets/classic_rock.png" className="rounded-md w-[57px] h-[57px]"/>
                <div className="flex flex-col items-start justify-start gap-[6px] pr-2">
                  <p className="text-16 font-bold leading-20">Classic rock</p>
                  <p className="text-14 font-normal leading-18">Lorem ipsum dolor sit ...</p>
                </div>
            </div>
            <div className="flex flex-grow justify-start items-center px-3 gap-[12px]">
              <div className="flex flex-row justify-start items-center gap-[13px]">
                <div className="relative h-6 w-6">
                  <div className="cursor-pointer">
                    <RandomIcon/>
                  </div>
                </div>
                <div className="relative h-6 w-6">
                  <div className="cursor-pointer">
                    <PreviousIcon/>
                  </div>
                </div>
                <div className="relative h-[40px] w-[40px]]">
                  <div className="cursor-pointer">
                    <ResumeIcon/>
                  </div>
                </div>
                <div className="relative h-6 w-6">
                  <div className="cursor-pointer">
                    <NextIcon/>
                  </div>
                </div>
                <div className="relative h-6 w-6">
                  <div className="cursor-pointer">
                    <RepeatIcon/>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start pl-4" style={{maxWidth:"1100px", width:"100%", margin: '0 auto 0 0'}}>
                <Slider size="md"
                  barClassName="bg-darkblue-500 h-1 rounded-lg"               
                  thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[0px] [&::-webkit-slider-thumb]:-mt-[0px]"
                  trackClassName="h-1 rounded-lg [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-[#2ec946]/20"
                  defaultValue={10}/>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center" style={{width: "160px"}}>                
            <div className="flex justify-end items-center w-[140px]">
              <div className="cursor-pointer pr-4">
                <VolumeIcon/>
              </div>
              <div className="flex" style={{width: "160px"}}>
                <Slider size="md"
                  barClassName="bg-darkblue-500 h-1 rounded-lg"               
                  thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[0px] [&::-webkit-slider-thumb]:-mt-[0px]"
                  trackClassName="h-1 rounded-lg [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-[#2ec946]/20"
                  defaultValue={10}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
