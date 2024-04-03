import React, { useEffect, useRef, useState } from "react";

import GenresSlide from "./GenresSlide";
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
      <GenresSlide/>
    </>
  );
}

export default Home;
