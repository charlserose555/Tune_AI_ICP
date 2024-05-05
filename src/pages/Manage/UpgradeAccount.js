import React, { useEffect, useRef, useState, useContext } from "react";
import { APIContext } from "../../context/ApiContext";
import { useSelector } from "../../store";
import audioPlay from "../../utils/AudioPlay";

function UpgradeAccount() {
    const [ mySongList, setMySongList] = useState([]); 
    const { getSongListByIdentity } = useContext(APIContext);

    const getMySongList = async () => {
      let result = await getSongListByIdentity();
      if(result != null && result.length > 0) {
        result.sort((a, b) => Number(b[1].createdAt) - Number(a[1].createdAt));
  
        setMySongList(result)
      }
    }

    useEffect(() => {
      getMySongList();
    })

    const play = (index) => {
      audioPlay(mySongList, index);
    }

    return (<>
    <div className="flex flex-row justify-start items-end pt-[20px] mb-[120px]">
      <div className="w-full">
        <div className="overflow-x-auto  x-scrollable-tag mt-4">
        </div>
      </div>
    </div>
    </>)
}

export default UpgradeAccount;