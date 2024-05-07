import React, { useEffect, useRef, useState, useContext } from "react";
import * as Icon from "../../icons";
import { APIContext } from "../../context/ApiContext";
import { formatDuration, convertToDataURL, formatDate} from "../../utils/format";
import { Principal } from '@dfinity/principal'; 
import audioPlay from "../../utils/AudioPlay";
import { useDispatch } from "../../store";
import { hideAudioPlay } from "../../store/reducers/player";

function PopularTrackItem({songItem, getSongList, index, play}) {
    const [ contentId, setContentId] = useState(''); 
    const [ title, setTitle] = useState(''); 
    const [ duration, setDuration] = useState(0); 
    const [ playCount, setPlayCount] = useState(0);
    const [ createdAt, setCreatedAt] = useState(0);
    const [ contentCanisterId, setContentCanisterId] = useState("");
    const dispatch = useDispatch();
    const { increasePlayCount } = useContext(APIContext);

    const [thumbnailUrl, setThumbnailUrl] = useState('');

    const setThumbnail = async () => {
      const chunks = [];
      chunks.push(new Uint8Array(songItem[1].thumbnail.file).buffer);
  
      const blob = new Blob(chunks, {type : songItem[1].thumbnail.fileType ? songItem[1].thumbnail.fileType : "image/jpeg"});

      const thumbnailUrl = await convertToDataURL(blob);

      setThumbnailUrl(thumbnailUrl);    
    }

    const playAudio = async () => {
      let playUrl = "";
      
      dispatch(hideAudioPlay());
      
      play(index)
      
      // if (process.env.DFX_NETWORK !== "ic") {
      //   playUrl = "http://127.0.0.1:4943/?canisterId=" + contentCanisterId + "&contentId=" + contentId;       
      // }

      // console.log("playUrl", playUrl);
    }

    useEffect(() => {
      setContentId(songItem[1].contentId);
      setTitle(songItem[1].title);
      setDuration(songItem[1].duration);
      setPlayCount(songItem[1].playCount);
      setCreatedAt(formatDate(Number(songItem[1].createdAt) / 1000));
      setContentCanisterId(Principal.from(songItem[1].contentCanisterId).toText())
      setThumbnail();
    }, [songItem])

    return (<>
     <tr style={{color: "white"}} className="group font-normal border-b bg-transparent border-gray-700 cursor-pointer group hover:bg-primary-800 transition-all duration-200 ease-in-out dark" >
        <td className="text-center relative flex justify-center w-full items-center">
          <img className="opacity-0 group-hover:opacity-100 absolute top-4 right-0 z-30" style={{width: "50px", height:"50px"}} src="/demo/assets/list_player.svg"onClick={() => playAudio()}/>
          <span className="opacity:100 group-hover:opacity-0 absolute top-8 right-4">{index + 1}</span>
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500 align-middle ">
          <div className="flex justify-center items-center w-full flex-row gap-4">
            <img className="rounded-2 w-[60px] h-[60px]" src={thumbnailUrl}/>
            <p className="pl-2">{title}</p>
          </div>
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{Number(playCount)}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{formatDuration(Number(duration))}</td>
        <td className="px-4 py-3 text-center"><Icon.OptionIcon/></td>
      </tr>
    </>)
}

export default PopularTrackItem;