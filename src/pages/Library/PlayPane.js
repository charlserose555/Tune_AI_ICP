import React, { useEffect, useRef, useState, useContext } from "react";
import * as Icon from "../../icons";
import { APIContext } from "../../context/ApiContext";
import TrackItem from "./TrackItem";
import { useSelector } from "../../store";

function PlayPane() {
    const [ mySongList, setMySongList] = useState([]); 
    const { getSongListByIdentity } = useContext(APIContext);
    const {songUploaded} = useSelector((state) => state.auth);

    // const getMySongList = async () => {
    //   let result = await getSongListByIdentity();
    //   if(result != null && result.length > 0) {
    //     result.sort((a, b) => Number(b[1].createdAt) - Number(a[1].createdAt)); 

    //     setMySongList(result)
    //   }
    // }

    // useEffect(() => {
    //   getMySongList();
    // }, [songUploaded])

    return (<>
    <div className="flex flex-row justify-start items-end pt-[20px] mb-[120px]">
      <div className="w-full">
        <audio controlsList="nodownload" className="basic-audio-player" controls>
          {/* <source src={"http://127.0.0.1:4943/?canisterId=eybox-vuaaa-aaaaa-qaa6a-cai&contentId=57"} type="audio/mpeg" /> */}
          {/* <source src={"https://localhost:8080/audio/example.mp3"} type="audio/mpeg" /> */}
        </audio>
      </div>
    </div>
    </>)
}

export default PlayPane;