import React, { useEffect, useRef, useState, memo, Suspense } from "react";

import FavouriteTrack from "./FavouriteTrack";
import ReleasedTrack from "./MyTracks";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { dispatch, useDispatch, useSelector } from "../../store";
import { ShowModal } from "../../store/reducers/menu";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import PageLoader from "../../components/Loader/PageLoader";
import library from "../../routes/library";

function Library() {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('');
  const {user} = useSelector((state) => (state.auth));
  const { isLoggedIn } = useSelector(
    (state) => state.auth
  );
  
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    history.push("/app/library/" + tabId);
  };

  const uploadSong = () => {
    if(!user.isInitialized) {
      dispatch(ShowModal("editProfile"))
      return;
    }

    dispatch(ShowModal("uploadSong"))
  }
  
  useEffect(() => {
    setActiveTab('tracks');
    history.push("/app/library/tracks");
  }, [])

  return (
    <>
      <div className="flex flex-col pt-16 font-plus pl-6 pr-6 text-white relative">
        <div className="absolute flex flex-row justify-start items-end z-index-1">
            <p className="text-24 font-normal leading-30 font-plus">My Library</p>
            <img className="px-3" src="/demo/assets/right_arrow.svg"></img>
        </div>
        <div className="relative pt-[58px]">
            <div className="flex flex-col mx-auto">  
              <div className="flex flex-row w-full justify-between gap-[10px]">
                <div className="flex flex-row w-full pr-2" style={{maxWidth:"240px"}}>
                  <input type="text" placeholder="Search.." className="bg-primary-700 opacity-100 py-2 pl-4 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent w-full" style={{height: '40px'}}></input>
                </div>
                <a className="cursor-pointer fill-btn-primary text-14 px-4 py-2 font-medium bg-darkblue-600 rounded-8 flex flex-row justify-center gap-45 items-center" onClick={() => uploadSong()} style={{textAlign: 'center', cursor: 'pointer', width:'120px'}}>
                  <p>Upload</p>
                  <img className="" src="/demo/assets/arrow-add.svg"/>
                </a>
              </div>
              <div>
                <ul className="tab-titles">
                  <li className={`${activeTab === 'tracks' ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-transparent'} inline-block cursor-pointer hover:text-gray-300 rounded-t-lg py-4 px-4 text-md font-medium text-center border-b-2`} onClick={() => handleTabClick('tracks')}>My Tracks</li>
                  <li className={`${activeTab === 'favorite' ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-transparent'} inline-block cursor-pointer hover:text-gray-300 rounded-t-lg py-4 px-4 text-md font-medium text-center border-b-2`} onClick={() => handleTabClick('favorite')}>Favorites</li>
                </ul>
                <div className="tab-content">
                  <Suspense fallback={<PageLoader />}>
                    <Switch>
                      {library.map((route, i) => {
                        return route.component ? (
                          !isLoggedIn && route.auth ? (
                            <Route
                              key={i}
                              path={`/app${route.path}`}
                              render={() => <Redirect to="/" />}
                            />
                          ) : (
                            <Route
                              key={i}
                              exact={true}
                              path={`/app/library${route.path}`}
                              render={(props) => <route.component {...props} />}
                            />
                          )
                        ) : null;
                      })}
                    </Switch>
                  </Suspense>
                </div>
              </div>     
            </div>
        </div>
      </div>
    </>
  );
}

export default Library;
