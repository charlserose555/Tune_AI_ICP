import React, { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useApi from "../../hooks/useApi";
import { useDispatch, useSelector } from "../../store";
import ProfileBanner from "./ProfileBanner";
import StarredList from "../Song/StarredList";

function Profile() {
  const history = useHistory();
  const Api = useApi();
  const dispatch = useDispatch();

  return (
    <>
      <ProfileBanner/>

      <StarredList/>
    </>
  );
}

export default Profile;
