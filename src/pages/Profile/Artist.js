import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "../../store";
import ArtistBanner from "./ArtistBanner";
import ArtistTrackList from "../Song/ArtistTrackList";

function Artist() {
  return (
    <>
      <ArtistBanner/>

      <ArtistTrackList/>
    </>
  );
}

export default Artist;
