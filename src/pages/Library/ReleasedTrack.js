import React, { useEffect, useRef, useState, useContext } from "react";
import * as Icon from "../../icons";
import { APIContext } from "../../context/ApiContext";
import TrackItem from "./TrackItem";
import { useSelector } from "../../store";

function ReleasedTrack() {
    const [ mySongList, setMySongList] = useState([]); 
    const { getSongListByIdentity } = useContext(APIContext);
    const {songUploaded} = useSelector((state) => state.auth);

    const getMySongList = async () => {
      let result = await getSongListByIdentity();

      result.sort((a, b) => Number(b[1].createdAt) - Number(a[1].createdAt));

      setMySongList(result)
    }

    useEffect(() => {
      getMySongList();
    }, [songUploaded])

    return (<>
    <div className="flex flex-row justify-start items-end pt-[20px] mb-[120px]">
      <div className="w-full">
        <div className="overflow-x-auto  x-scrollable-tag mt-4">
          <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-800 min-w-[610px]">
            <thead className="border-b dark:border-gray-700 text-sm text-gray-700 bg-transparent dark:bg-primary" style={{color: "white"}}>
              <tr>
                  <th scope="col" className="px-4 pb-5 text-center min-w-[50px]">
                      # 
                  </th>
                  <th scope="col" className="px-4 pb-5 text-center">
                      Thumbnail
                  </th>
                  <th scope="col" className="px-4 pb-5 text-center">
                      Title
                  </th>
                  <th scope="col" className="px-4 pb-5 text-center">
                  <div className="flex justify-center w-full items-center flex-row">
                      <img src="/demo/assets/eye_hidden.svg" className="w-[24px] h-[24px]"/>
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
                  </th>
              </tr>
          </thead>
          <tbody>
              {mySongList.map((item, index) => { 
                return ((
                  <TrackItem songItem={item} index={index}/>
              )) } )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>)
}

export default ReleasedTrack;