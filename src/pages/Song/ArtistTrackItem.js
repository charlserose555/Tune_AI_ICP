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

function ArtistTrackItem({songItem, index, play}) {
    const [ contentId, setContentId] = useState(''); 
    const [ title, setTitle] = useState(''); 
    const [ duration, setDuration] = useState(0); 
    const [ playCount, setPlayCount] = useState(0);
    const [ createdAt, setCreatedAt] = useState(0);
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
      dispatch(hideAudioPlay());
      
      play(index)
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
      setThumbnail();
    }, [songItem])

    return (<>
     <tr style={{color: "white"}} className="font-normal border-b bg-transparent border-gray-700 cursor-pointer hover:bg-primary-800 transition-all duration-200 ease-in-out dark" >
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500"
         style={{ maxWidth: '200px'}}>
          <div className="flex justify-start items-center flex-row pl-4 gap-[30px]" >
            <img className="rounded-2 w-[60px] h-[60px]" src={thumbnailUrl}/>
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</p>
          </div>
        </td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{Number(playCount)}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500">{formatDuration(Number(duration))}</td>
        <td className="px-4 py-3 text-center group-hover:text-darkblue-500"><div className="min-w-[100px]">{createdAt}</div></td>
        <td className="px-4 py-3 text-center items-center">
          <div className="flex justify-center items-center" onClick={() => playAudio()}>
            <Icon.ItemPlayIcon/>
          </div>
        </td>
        <td className="px-4 py-3 text-center items-center">
          <div className="flex justify-center items-center">
            <Icon.FavoriteIcon/>
          </div>
        </td>
      </tr>
    </>)
}

export default ArtistTrackItem;