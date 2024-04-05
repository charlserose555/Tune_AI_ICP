import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "../../store";

export default function GenresSlide() {
  const dispatch = useDispatch();

  return (
    <div className="font-plus flex flex-col text-white relative">
      <div className="absolute flex flex-row justify-start items-end z-index-1">
        <p className="text-24 font-normal leading-30 font-plus">Popular Genres</p>
        <img className="px-3" src="/demo/assets/right_arrow.svg"></img>
      </div>
      <div className="flex flex-row overflow-x-auto z-index-100">
        <ul className="flex w-full justify-start items-start space-x-4 stories py-[58px] px-4"
        >
          <li
            className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}
          >
            <div className="banner-item shadow-sm rounded-lg group flex flex-col justify-end items-center p-2" style={{
              width: '144px',
              height: '144px',
              backgroundImage: 'url("/demo/assets/classic_rock.png")',
              backgroundRepeat: "no-repat",
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }}> 
              <div className="banner-img w-[54px] h-[54px] group rounded-full z-index-10 flex items-center justify-center relative opacity-0 group-hover:opacity-100 duration-300 group-hover:-translate-y-[160px] duration-400"  style={{bottom: "-50px", left: "45px"}}>
                <div className="extend-play absolute bg-darkblue-500 bg-opacity-80 w-full h-full opacity-0 hover:shadow-bottom_1 rounded-full w-[54px] h-[54px] ">
                  <img src="/demo/assets/expand_play.svg" className="rounded-full"/>
                </div>
                <img src="/demo/assets/banner_play.svg" className="w-[47px] h-[47px] opacity-100 banner-play absolute w-full h-full rounded-full"/>
              </div>
            </div>
            <div className="flex justify-center items-center w-[144px] pt-1">
              <p className="text-14 font-plus font-bold leading-18" style={{textAlign: "center"}}>Classic rock</p>
            </div>
          </li>
          <li
            className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}
          >
            <div className="banner-item shadow-sm rounded-lg group flex flex-col justify-end items-center p-2" style={{
              width: '144px',
              height: '144px',
              backgroundImage: 'url("/demo/assets/zazz.png")',
              backgroundRepeat: "no-repat",
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }}> 
              <div className="banner-img w-[54px] h-[54px] group rounded-full z-index-10 flex items-center justify-center relative opacity-0 group-hover:opacity-100 duration-300 group-hover:-translate-y-[160px] duration-400"  style={{bottom: "-50px", left: "45px"}}>
                <div className="extend-play absolute bg-darkblue-500 bg-opacity-80 w-full h-full opacity-0 hover:shadow-bottom_1 rounded-full w-[54px] h-[54px] ">
                  <img src="/demo/assets/expand_play.svg" className="rounded-full"/>
                </div>
                <img src="/demo/assets/banner_play.svg" className="w-[47px] h-[47px] opacity-100 banner-play absolute w-full h-full rounded-full"/>
              </div>
            </div>
            <div className="flex justify-center items-center w-[144px] pt-1">
              <p className="text-14 font-plus font-bold leading-18" style={{textAlign: "center"}}>Zazz</p>
            </div>
          </li>
          <li
            className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}
          >
            <div className="banner-item shadow-sm rounded-lg group flex flex-col justify-end items-center p-2" style={{
              width: '144px',
              height: '144px',
              backgroundImage: 'url("/demo/assets/dubstep.png")',
              backgroundRepeat: "no-repat",
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }}> 
              <div className="banner-img w-[54px] h-[54px] group rounded-full z-index-10 flex items-center justify-center relative opacity-0 group-hover:opacity-100 duration-300 group-hover:-translate-y-[160px] duration-400"  style={{bottom: "-50px", left: "45px"}}>
                <div className="extend-play absolute bg-darkblue-500 bg-opacity-80 w-full h-full opacity-0 hover:shadow-bottom_1 rounded-full w-[54px] h-[54px] ">
                  <img src="/demo/assets/expand_play.svg" className="rounded-full"/>
                </div>
                <img src="/demo/assets/banner_play.svg" className="w-[47px] h-[47px] opacity-100 banner-play absolute w-full h-full rounded-full"/>
              </div>
            </div>
            <div className="flex justify-center items-center w-[144px] pt-1">
              <p className="text-14 font-plus font-bold leading-18" style={{textAlign: "center"}}>DubStep</p>
            </div>
          </li>
          <li
            className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}
          >
            <div className="banner-item shadow-sm rounded-lg group flex flex-col justify-end items-center p-2" style={{
              width: '144px',
              height: '144px',
              backgroundImage: 'url("/demo/assets/rhythm.png")',
              backgroundRepeat: "no-repat",
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }}> 
              <div className="banner-img w-[54px] h-[54px] group rounded-full z-index-10 flex items-center justify-center relative opacity-0 group-hover:opacity-100 duration-300 group-hover:-translate-y-[160px] duration-400"  style={{bottom: "-50px", left: "45px"}}>
                <div className="extend-play absolute bg-darkblue-500 bg-opacity-80 w-full h-full opacity-0 hover:shadow-bottom_1 rounded-full w-[54px] h-[54px] ">
                  <img src="/demo/assets/expand_play.svg" className="rounded-full"/>
                </div>
                <img src="/demo/assets/banner_play.svg" className="w-[47px] h-[47px] opacity-100 banner-play absolute w-full h-full rounded-full"/>
              </div>
            </div>
            <div className="flex justify-center items-center w-[144px] pt-1">
              <p className="text-14 font-plus font-bold leading-18" style={{textAlign: "center"}}>Rhythm and Blues o R&B</p>
            </div>
          </li>
          <li
            className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}
          >
            <div className="banner-item shadow-sm rounded-lg group flex flex-col justify-end items-center p-2" style={{
              width: '144px',
              height: '144px',
              backgroundImage: 'url("/demo/assets/techno.png")',
              backgroundRepeat: "no-repat",
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }}> 
              <div className="banner-img w-[54px] h-[54px] group rounded-full z-index-10 flex items-center justify-center relative opacity-0 group-hover:opacity-100 duration-300 group-hover:-translate-y-[160px] duration-400"  style={{bottom: "-50px", left: "45px"}}>
                <div className="extend-play absolute bg-darkblue-500 bg-opacity-80 w-full h-full opacity-0 hover:shadow-bottom_1 rounded-full w-[54px] h-[54px] ">
                  <img src="/demo/assets/expand_play.svg" className="rounded-full"/>
                </div>
                <img src="/demo/assets/banner_play.svg" className="w-[47px] h-[47px] opacity-100 banner-play absolute w-full h-full rounded-full"/>
              </div>
            </div>
            <p className="text-14 font-plus font-bold leading-18 pt-1">Techno</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
