import React, { useEffect, useRef, useState, memo, Suspense } from "react";

import FavouriteTrack from "./FavouriteTrack";
import ReleasedTrack from "./MyTracks";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { dispatch, useDispatch, useSelector } from "../../store";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import PageLoader from "../../components/Loader/PageLoader";
import library from "../../routes/profile";
import ProfileBanner from "./ProfileBanner";

function Library() {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('');
  const {user} = useSelector((state) => (state.auth));
  const { isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const location = useLocation()
  
  const handleTabClick = (tabId) => {
    history.push("/app/profile/" + tabId);
  };

  useEffect(() => {
    let segment = location.pathname.split('/').pop();

    if(segment == "profile")
      segment = "tracks";

    console.log("segment", segment)

    setActiveTab(segment);
  }, [location])

  return (
    <>
      <ProfileBanner/>

      <div className="flex flex-col font-plus pl-6 pr-6 text-white relative">
        <div className="relative">
            <div className="flex flex-col mx-auto"> 
              <div>
                <ul className="tab-titles">
                  <li className={`${activeTab === 'tracks' ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-transparent'} inline-block cursor-pointer hover:text-gray-300 rounded-t-lg py-4 px-4 text-md font-medium text-center border-b-2`} onClick={() => handleTabClick('tracks')}>My Tracks</li>
                  <li className={`${activeTab === 'favorite' ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-transparent'} inline-block cursor-pointer hover:text-gray-300 rounded-t-lg py-4 px-4 text-md font-medium text-center border-b-2`} onClick={() => handleTabClick('favorite')}>Favorites</li>
                  <li className={`${activeTab === 'upload' ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-transparent'} inline-block cursor-pointer hover:text-gray-300 rounded-t-lg py-4 px-4 text-md font-medium text-center border-b-2`} onClick={() => handleTabClick('upload')}>Upload</li>
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
                              path={`/app/profile${route.path}`}
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
