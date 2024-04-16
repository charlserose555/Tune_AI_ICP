import React, { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "../../store";
import StarredList from "../Song/StarredList";
import { useParams } from "react-router-dom";
import GenresDetailBanner from "./GenresDetailBanner";

function GenresDetail() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, demo } = useParams();

  return (
    <>
      <GenresDetailBanner/>

      <StarredList/>
    </>
  );
}

export default GenresDetail;
