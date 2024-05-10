import React, { useEffect, useRef, useState, useContext } from "react";
import * as Icon from "../../icons";
import { APIContext } from "../../context/ApiContext";
import audioPlay from "../../utils/AudioPlay";
import PopularTrackItem from "./NewTrackItem";
import { dispatch, useSelector } from "../../store";

function PopularTracks() {
    const [ songList, setSongList] = useState([]); 
    const { getAllReleasedTracks } = useContext(APIContext);
    const { songListUpdated } = useSelector((state) => state.auth);

    const getSongList = async () => {
      let result = await getAllReleasedTracks();
      if(result != null && result.length > 0) {
        result.sort((a, b) => Number(b[1].createdAt) - Number(a[1].createdAt));
  
        setSongList(result)
      }
    }

    useEffect(() => {
      getSongList();
    }, [songListUpdated])

    const play = (index) => {
      audioPlay(songList, index);
    }

    return (<>
    <div className="flex flex-row justify-start items-end font-plus px-6 pt-6">
        <p className="text-24 font-normal leading-30 font-plus">Popular Tracks</p>
        <img className="px-3" src="/demo/assets/right_arrow.svg"></img>
    </div>
    <div className="flex flex-row justify-start items-end pt-[20px] mb-[120px] font-plus px-[20px]">
      <div className="w-full">
        <div className="overflow-x-auto  x-scrollable-tag mt-4">
          <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-800 min-w-[610px]">
            <thead className="border-b dark:border-gray-700 text-sm text-gray-700 bg-transparent dark:bg-primary" style={{color: "white"}}>
            <tr>
                <th scope="col" className="px-4 pb-5 text-start">
                  <p className="pl-4">
                    Title
                  </p>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                    Artist
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                <div className="flex justify-center w-full items-center flex-row">
                    <img src="/demo/assets/eye_hidden.svg" className="min-w-[24px] min-h-[24px]"/>
                </div>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                  <div className="flex justify-center w-full items-center flex-row">
                      <img src="/demo/assets/clock.svg" className="w-[24px] h-[24px]"/>
                  </div>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                    CreatedAt
                </th>
                <th scope="col" className="px-4 pb-5 text-center">       
                    Play
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                           
                </th>
              </tr>
          </thead>
          <tbody>
              {songList.map((item, index) => { 
                return ((
                  <PopularTrackItem songItem={item} getSongList = {getSongList} play={play} index={index} key={index}/>
              )) } )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>)
}

export default PopularTracks;