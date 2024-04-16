import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "../../store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import GenresCard from "../Genres/GenresCard";

export default function GenresSlide() {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const history = useHistory();

  const handleScrollLeft = () => {
    containerRef.current.scrollBy(
      { left: -200, behavior: 'smooth' }
    )
  }

  const handleScrollRight = () => {
    containerRef.current.scrollBy(
      { left: 200, behavior: 'smooth' }
    )
  }

  return (
    <div className="font-plus flex flex-col text-white relative">
      <div className="absolute flex flex-row justify-start items-end z-index-1">
        <p className="text-24 font-normal leading-30 font-plus">Popular Genres</p>
        <img className="px-3" src="/demo/assets/right_arrow.svg"></img>
      </div>
      <div ref={containerRef}  className="flex flex-row relative overflow-x-auto z-index-100 mx-[10px]">
        <ul className="flex w-full justify-start items-start space-x-4 stories pt-[58px] pb-[10px]"
        >
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
              <GenresCard url={'url("/demo/assets/classic_rock.png")'} name={'Classic rock'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/zazz.png")'} name={'Zazz'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/dubstep.png")'} name={'DubStep'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/rhythm.png")'} name={'Rhythm and Blues o R&B'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/techno.png")'} name={'Techno'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
              <GenresCard url={'url("/demo/assets/classic_rock.png")'} name={'Classic rock'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/zazz.png")'} name={'Zazz'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/dubstep.png")'} name={'DubStep'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/rhythm.png")'} name={'Rhythm and Blues o R&B'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/techno.png")'} name={'Techno'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
              <GenresCard url={'url("/demo/assets/classic_rock.png")'} name={'Classic rock'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/zazz.png")'} name={'Zazz'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/dubstep.png")'} name={'DubStep'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/rhythm.png")'} name={'Rhythm and Blues o R&B'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/techno.png")'} name={'Techno'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
              <GenresCard url={'url("/demo/assets/classic_rock.png")'} name={'Classic rock'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/zazz.png")'} name={'Zazz'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/dubstep.png")'} name={'DubStep'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/rhythm.png")'} name={'Rhythm and Blues o R&B'}/> 
            </div>
          </li>
          <li>
            <div className={`flex flex-none flex-col text-white items-center cursor-pointer justify-between space-y-1 rounded-sm hover:text-darkblue-700`}>
            <GenresCard url={'url("/demo/assets/techno.png")'} name={'Techno'}/> 
            </div>
          </li>
        </ul>          
      </div>
      <div className="group" style={{position:"absolute", width:"34px", height:"34px", top:"118px", zIndex:"20", right:"-5px", cursor:"pointer", pointerEvents: 'auto'}} onClick={() => handleScrollRight()}>
        <img style={{transition:".3s all ease-out"}} className="opacity-100 group-hover:opacity-0 absolute right-0 top-0 rounded-full" src="/demo/assets/banner_left.svg"></img>
        <img style={{transition:".3s all ease-out"}} className="opacity-0 group-hover:opacity-100 absolute right-0 top-0 rounded-full" src="/demo/assets/banner_left_hover.svg"></img>
      </div>
      <div className="group" style={{position:"absolute", width:"34px", height:"34px", top:"118px", zIndex:"20", left:"-5px", cursor:"pointer", pointerEvents: 'auto'}} onClick={() => handleScrollLeft()}>
        <img style={{transition:".3s all ease-out"}} className="opacity-100 group-hover:opacity-0 absolute right-0 top-0 rounded-full" src="/demo/assets/banner_right.svg"></img>
        <img style={{transition:".3s all ease-out"}} className="opacity-0 group-hover:opacity-100 absolute right-0 top-0 rounded-full transform rotate-180" src="/demo/assets/banner_left_hover.svg"></img>
      </div>
    </div>
  );
}
