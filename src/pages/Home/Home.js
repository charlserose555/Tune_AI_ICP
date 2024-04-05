import React, { useEffect, useRef, useState } from "react";

import GenresSlide from "./GenresSlide";
import PopularTracks from "./PopularTracks";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useApi from "../../hooks/useApi";
import { useDispatch, useSelector } from "../../store";

function Home() {
  const history = useHistory();
  const Api = useApi();
  const dispatch = useDispatch();

  const [gameList, setGameList] = useState([]);
  const { user, isLoggedIn, balances } = useSelector((store) => store.auth);

  return (
    <>
      <div className="flex flex-col pt-16 pl-6 pr-2 overflow-x-auto">
        <div className="font-plus flex flex-col text-white relative">
            <GenresSlide/>
            <PopularTracks/>
        </div>
      </div>
    </>
  );
}

export default Home;
