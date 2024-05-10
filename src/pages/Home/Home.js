import React, { useEffect, useRef, useState } from "react";

import TrackSide from "./TrackSlide";
import PopularTracks from "./NewTracks";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "../../store";

function Home() {
  return (
    <>
      <div className="flex flex-col pt-16 font-plus pl-6 pr-6 text-white relative overflow-x-auto">
          <TrackSide/>
          <PopularTracks/>
      </div>
    </>
  );
}

export default Home;
