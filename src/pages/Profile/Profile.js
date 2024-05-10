import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "../../store";
import ProfileBanner from "./ProfileBanner";
import ArtistTrackList from "../Song/ArtistTrackList";

function Profile() {
  return (
    <>
      <ProfileBanner/>

      <ArtistTrackList/>
    </>
  );
}

export default Profile;
