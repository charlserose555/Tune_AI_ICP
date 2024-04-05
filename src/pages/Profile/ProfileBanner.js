import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "../../store";

export default function ProfileBanner() {
  const dispatch = useDispatch();

  return (
    <div className="font-plus flex flex-col text-white relative">
      <div className="absolute flex flex-row justify-start items-end z-index-1" style={{backgroundImage: "/demo/assets/profile_banner.png"}}>
      </div>
    </div>
  );
}
