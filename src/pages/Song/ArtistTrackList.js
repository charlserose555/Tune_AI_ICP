import React, { useEffect, useRef, useState, useContext } from "react";
import { APIContext } from "../../context/ApiContext";
import { useSelector } from "../../store";
import audioPlay from "../../utils/AudioPlay";
import ArtistTrackItem from "./ArtistTrackItem";
import { useParams } from 'react-router-dom';

function ArtistTrackList() {
  const { id } = useParams();
  const [ trackList, setTrackList] = useState([]); 
  const { getSongListByIdentity } = useContext(APIContext);
  const { songListUpdated } = useSelector((state) => state.auth);

  const getArtistTracks = async () => {
    let result = await getSongListByIdentity();
    if(result != null && result.length > 0) {
      result.sort((a, b) => Number(b[1].createdAt) - Number(a[1].createdAt));

      setTrackList(result)
    }
  }

    useEffect(() => {
      console.log(id);

      getArtistTracks();
    }, [id])

  const play = (index) => {
    audioPlay(trackList, index);
  }

  return (<>
  <div className="px-6 pt-[70px] gap-[40px] pb-[120px]">
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-row justify-start items-end">
          <p className="text-24 font-normal leading-30 font-plus">Tracks</p>
      </div>
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
              {trackList.map((item, index) => { 
                return ((
                  <ArtistTrackItem songItem={item} play={play} index={index} key={index}/>
              )) } )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </>)
}

export default ArtistTrackList;