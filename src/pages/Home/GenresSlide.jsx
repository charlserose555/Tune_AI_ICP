import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "../../store";
import { ChangePage } from "../../store/reducers/menu";
import userEvent from "@testing-library/user-event";

export default function GenresSlide() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col font-plus text-white">
      <div className="flex flex-row justify-start items-center">
        <p className="text-24 font-light leading-30">Popular genres</p>
        <img src="/demo/assets/right_arrow.svg"></img>
      </div>
      <div className="flex flex-row">
      <ul
        style={{ padding: "18px 8px" }}
        className="flex w-full justify-start items-start space-x-4 overflow-x-auto stories"
      >
        <li
          className={`game-card flex flex-none flex-col items-center cursor-pointer justify-between space-y-1 rounded-md bg-primary text-yellow-300 hover:shadow-[0_0_2px_#ff0,inset_0_0_2px_#ff0,0_0_5px_#ff0,0_0_12px_#ff0] transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300`}
        >
          <div className="">

          </div>

          <p className="text-xs line-clamp-1 pt-1">Live</p>
        </li>
      </ul>
      </div>
    </div>
  );
}
