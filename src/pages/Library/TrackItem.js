import React, { useEffect, useRef, useState, useContext } from "react";
import * as Icon from "../../icons";
import { APIContext } from "../../context/ApiContext";
import { formatDuration, convertToDataURL, formatDate} from "../../utils/format";
import { Principal } from '@dfinity/principal'; 
import audioPlay from "../../utils/AudioPlay";
import { useDispatch } from "../../store";
import { hideAudioPlay } from "../../store/reducers/player";
import loading from "../../utils/Loading.js";
import { UpdateSongList } from "../../store/reducers/auth";

function TrackItem({songItem, index, play}) {
    const [ contentId, setContentId] = useState(''); 
    const [ title, setTitle] = useState(''); 
    const [ duration, setDuration] = useState(0); 
    const [ playCount, setPlayCount] = useState(0);
    const [ createdAt, setCreatedAt] = useState(0);
    const [ contentCanisterId, setContentCanisterId] = useState("");
    const dispatch = useDispatch();
    const { releaseTrackItem } = useContext(APIContext);

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

    const releaseTrack = async (release) => {
      loading();
      
      await releaseTrackItem(contentId, release);

      dispatch(UpdateSongList());

      loading(false);
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
          <img className="opacity-0 group-hover:opacity-100 absolute top-4 left-2 z-30" style={{width: "50px", height:"50px"}} src="/demo/assets/list_player.svg"onClick={() => playAudio()}/>
          <span className="opacity:100 group-hover:opacity-0 absolute top-8 left-6">{index + 1}</span>
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500 align-middle">
          <div className="flex justify-center w-full items-center flex-row pl-4">
            <img className="rounded-2 w-[60px] h-[60px]" src={thumbnailUrl}/>
          </div>
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500 align-middle ">{title}
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{Number(playCount)}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{formatDuration(Number(duration))}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500"><div className="min-w-[100px]">{createdAt}</div></td>
        <td className="px-4 py-3 text-center">{!songItem[1].isReleased? <a className="cursor-pointer fill-btn-primary text-14 py-2 px-2 font-medium bg-darkblue-600 rounded-8 flex flex-row justify-center gap-45 items-center" 
          onClick={() => releaseTrack(true)} style={{textAlign: 'center', cursor: 'pointer'}}>
            <p>Release</p>
          </a> : 
          <a className="cursor-pointer fill-btn-second text-14 py-2 px-2 font-medium bg-coral-600 rounded-8 flex flex-row justify-center gap-45 items-center" 
          onClick={() => releaseTrack(false)}>Down</a>}</td>
      </tr>
    </>)
}

export default TrackItem;