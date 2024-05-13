import React, { useEffect, useRef, useState, useContext } from "react";
import { APIContext } from "../../context/ApiContext";
import TrackItem from "./TrackItem";
import { useSelector } from "../../store";
import audioPlay from "../../utils/AudioPlay";
import FavouriteTrackItem from "./FavouriteTrackItem";

function FavouriteTrack() {
    const [ favouriteTrack, setFavouriteTracks] = useState([]); 
    const { getFavouriteTracksAPI } = useContext(APIContext);
    const { songListUpdated, user } = useSelector((state) => state.auth);

    const getFavouriteTracks = async () => {
      let result = await getFavouriteTracksAPI(user.principal);
      
      if(result != null && result.length > 0) {
        result.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  
        setFavouriteTracks(result)
      }
    }

    useEffect(() => {
      getFavouriteTracks();
    }, [songListUpdated])

    const play = (index) => {
      audioPlay(favouriteTrack, index);
    }

    return (<>
    <div className="flex flex-row justify-start items-end pt-[20px] mb-[120px]">
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
              {favouriteTrack.map((item, index) => { 
                return ((
                  <FavouriteTrackItem trackItem={item} play={play} index={index} key={index}/>
              )) } )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>)
}

export default FavouriteTrack;