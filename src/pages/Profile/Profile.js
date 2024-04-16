import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "../../store";
import ProfileBanner from "./ProfileBanner";
import StarredList from "../Song/StarredList";

function Profile() {
  return (
    <>
      <ProfileBanner/>

      <StarredList/>
    </>
  );
}

export default Profile;
