import React, { useEffect, useRef, useState, useContext } from "react";
import * as Icon from "../../icons";
import { APIContext } from "../../context/ApiContext";
import { formatDuration, convertToDataURL, formatDate} from "../../utils/format";

function TrackItem({songItem, key}) {
    const [ contentId, setContentId] = useState(''); 
    const [ title, setTitle] = useState(''); 
    const [ duration, setDuration] = useState(0); 
    const [ playCount, setPlayCount] = useState(0);
    const [ createdAt, setCreatedAt] = useState(0);

    const [thumbnailUrl, setThumbnailUrl] = useState('');

    const setThumbnail = async () => {
      const chunks = [];
      chunks.push(new Uint8Array(songItem[1].thumbnail.file).buffer);
  
      const blob = new Blob(chunks, {type : songItem[1].thumbnail.fileType ? songItem[1].thumbnail.fileType : "image/jpeg"});

      const thumbnailUrl = await convertToDataURL(blob);

      setThumbnailUrl(thumbnailUrl);    
    }

    useEffect( () => {
      setContentId(songItem[1].contentId);
      setTitle(songItem[1].title);
      setDuration(songItem[1].duration);
      setPlayCount(songItem[1].playCount);
      setCreatedAt(formatDate(Number(songItem[1].createdAt) / 1000))
      setThumbnail()
    }, [songItem])

    return (<>
     <tr style={{color: "white"}} className="group font-normal border-b bg-transparent border-gray-700 cursor-pointer group hover:bg-primary-800 transition-all duration-200 ease-in-out dark" key={key}>
        <td className="text-center relative flex justify-center w-full items-center">
          <img className="opacity-0 group-hover:opacity-100 absolute top-5 right-0" style={{width: "43px", height:"34px"}} src="/demo/assets/list_player.svg"/>
          <span className="opacity:100 group-hover:opacity-0 absolute top-8 right-4">{contentId}</span>
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500 align-middle">
          <div className="flex justify-center w-full items-center flex-row">
            <img className="rounded-2 w-[60px] h-[60px]" src={thumbnailUrl}/>
          </div>
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500 align-middle">
          <div className="flex justify-center w-full items-center flex-row">
            <p className="pl-2">{title}</p>
          </div>
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{Number(playCount)}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{formatDuration(Number(duration))}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{createdAt}</td>
        <td className="px-4 py-3 text-center"><Icon.OptionIcon/></td>
      </tr>
    </>)
}

export default TrackItem;