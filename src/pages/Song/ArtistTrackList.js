import React, { useEffect, useRef, useState, useContext } from "react";
import { APIContext } from "../../context/ApiContext";
import { useSelector } from "../../store";
import audioPlay from "../../utils/AudioPlay";
import ArtistTrackItem from "./ArtistTrackItem";
import { useParams } from 'react-router-dom';
import { decodeFromBase64 } from "../../utils/format";

function ArtistTrackList() {
  const { id } = useParams();
  const [ trackList, setTrackList] = useState([]); 
  const { getReleasedTracksByArtist } = useContext(APIContext);
  const { songListUpdated } = useSelector((state) => state.auth);

  const getArtistTracks = async (artist) => {
    let result = await getReleasedTracksByArtist(artist, true);
    if(result != null && result.length > 0) {
      result.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

      setTrackList(result)
    }
  }

    useEffect(() => {
      console.log("decodeFromBase64(id)", decodeFromBase64(id))

      getArtistTracks(decodeFromBase64(id));
    }, [id])

  const play = (index) => {
    audioPlay(trackList, index);
  }

  return (<>
  <div className="px-6 pt-[70px] gap-[40px] pb-[120px] font-plus">
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
                  <ArtistTrackItem trackItem={item} play={play} index={index} key={index}/>
              )) } )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </>)
}

export default ArtistTrackList;