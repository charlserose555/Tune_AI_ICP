import React, { useEffect, useRef, useState } from "react";

import GenresSlide from "./GenresSlide";
import PopularTracks from "./PopularTracks";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "../../store";

function Home() {
  return (
    <>
      <div className="flex flex-col pt-16 font-plus pl-6 pr-6 text-white relative overflow-x-auto">
          <GenresSlide/>
          <PopularTracks/>
      </div>
    </>
  );
}

export default Home;
