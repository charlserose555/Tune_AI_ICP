
import { CloseIcon, MuteVolumeIcon, NextIcon, PauseIcon, PlayIcon, PreviousIcon, RandomIcon, RepeatIcon, ResumeIcon, VolumeIcon } from "../../icons";
import { Slider } from "@material-tailwind/react";
import { dispatch, useSelector } from "../../store";
import { useEffect, useCallback } from "react";
import { convertToDataURL } from "../../utils/format";
import { useState, useContext, useRef } from "react";
import { APIContext } from "../../context/ApiContext";
import DisplayTrack from "./DisplayTrack";
import { Principal } from "@dfinity/principal";
import ProgressBar from "./ProgressBar";
import { useDispatch } from "../../store";
import { hideAudioPlay } from "../../store/reducers/player";

export default function AudioPlayer() {
    const player = useSelector((state) => state.player);
    const { play, tracks, currentIndex } = player;
    const { getProfileInfo } = useContext(APIContext);

    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [trackIndex, setTrackIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();

    const togglePlayPause = () => {
      setIsPlaying((prev) => !prev);
    };

    // reference
    const audioRef = useRef();
    const progressBarRef = useRef();
    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        if(!audioRef.current)
            return;
        
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
          '--range-progress',
          `${(progressBarRef.current.value / duration) * 100}%`
        );    

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    const setCurrentTrackInfo = async (tracks, currentIndex) => {
        const chunks = [];
        
        chunks.push(new Uint8Array(tracks[currentIndex][1].thumbnail.file).buffer);
        
        const blob = new Blob(chunks, {type : tracks[currentIndex][1].thumbnail.fileType ? tracks[currentIndex][1].thumbnail.fileType : "image/jpeg"});
  
        const thumbnailUrl = await convertToDataURL(blob);
        
        let artistInfo = await getProfileInfo(tracks[currentIndex][1].userCanisterId, tracks[currentIndex][1].userId);
        
        const trackInfo = {
            src : "http://127.0.0.1:4943/?canisterId=" + Principal.from(tracks[currentIndex][1].contentCanisterId).toText() + "&contentId=" + tracks[currentIndex][1].contentId,
            thumbnailUrl : thumbnailUrl,
            title : tracks[currentIndex][1].title,
            artistName : artistInfo[0].displayName,
            duration : tracks[currentIndex][1].duration  
        }

        // const trackInfo = {
        //     src : "https://" + Principal.from(tracks[currentIndex][1].contentCanisterId).toText() + ".raw.icp0.io/?&contentId=" + tracks[currentIndex][1].contentId,
        //     thumbnailUrl : thumbnailUrl,
        //     title : tracks[currentIndex][1].title,
        //     artistName : artistInfo[0].displayName,
        //     duration : tracks[currentIndex][1].duration  
        // }
        
        console.log("track", trackInfo);
        setCurrentTrack(trackInfo);

        setIsLoaded(true)
    }

    const setAudioTrackInfo = (tracks, currentIndex) => {
        setCurrentTrackInfo(tracks, currentIndex);
    }

    const setVolumeValue = (value) => {
        setVolume(value)
        if(muteVolume) {
            setMuteVolume(false)
        }
    }

    const handleNext = () => {
        if (trackIndex >= tracks.length - 1) {
          setTrackIndex(0);
          setCurrentTrackInfo(tracks, 0);
        } else {
          setTrackIndex((prev) => prev + 1);
          setCurrentTrackInfo(tracks, trackIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (trackIndex === 0) {
          let lastTrackIndex = tracks.length - 1;
          setTrackIndex(lastTrackIndex);
          setCurrentTrackInfo(tracks, lastTrackIndex);
        } else {
          setTrackIndex((prev) => prev - 1);
          setCurrentTrackInfo(tracks, trackIndex - 1);
        }
    };

    const closeAudioPanel = () => {
        dispatch(hideAudioPlay())
    }

    useEffect(() => {
        if(tracks.length) {
            setTrackIndex(currentIndex)

            setAudioTrackInfo(tracks, currentIndex);  
        } else {
            setDuration(0);

            setTimeProgress(0);

            setCurrentTrack(null);

            setTrackIndex(0);

            setIsLoaded(false);
        }
        return () => {
            setDuration(0);

            setTimeProgress(0);

            setCurrentTrack(null);

            setTrackIndex(0);

            setIsLoaded(false);
        }
    }, [tracks, currentIndex])

    useEffect(() => {
        if(audioRef.current) {
            if (isPlaying) {
              audioRef.current.play();
            } else {
              audioRef.current.pause();
            }
        }

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, isPlaying, repeat]);

    useEffect(() => {
        if(player.play) {
            setCurrentTrack(null);

            setIsPlaying(false);

            togglePlayPause();
        }
    }, [player])

    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = volume / 100;
          audioRef.current.muted = muteVolume;
        }
    }, [volume, audioRef, muteVolume]);

    return (
        <>
            {(play && isLoaded) && (
                
                <div className="absolute font-plus text-white bottom-0 left-0 w-full z-40" style={{boxShadow: "0px -20px 40px rgba(0, 0, 0, 0.45)"}}>
                    <div className="flex relative justify-start items-center w-full bg-primary-700 w-fixed gap-[10px] py-[20px] px-[10px] md:px-[30px]">
                        <div className="absolute top-2 right-2 cursor-pointer" onClick={() => closeAudioPanel()}>
                            <CloseIcon/>
                        </div>
                        <div className="flex justify-start hidden md:block items-center w-[56px]">
                            <img src={currentTrack?.thumbnailUrl} className="rounded-md"/>
                        </div>
                        <DisplayTrack
                            {...{
                                currentTrack,
                                audioRef,
                                setDuration,
                                progressBarRef,
                                handleNext
                            }}
                        />
                        <div className="flex justify-start items-center w-full">
                            <div className="flex flex-col justify-around items-start hidden lg:block gap-[6px] pr-2">
                                <p className="text-16 font-bold leading-20">{currentTrack?.artistName}</p>
                                <p className="text-14 font-normal leading-18 truncate w-[90px]">{currentTrack?.title}</p>
                            </div>
                            <div className="flex flex-col md:flex-row flex-grow justify-start items-center md:px-3 gap-[12px]">
                                <div className="flex flex-row justify-start items-center order-2 md:order-1 gap-[13px]">
                                    <div className="relative h-6 w-6">
                                        <div className="cursor-pointer">
                                            <RandomIcon/>
                                        </div>
                                    </div>
                                    <div className="relative h-6 w-6">
                                    <div className="cursor-pointer" onClick={() => handlePrevious()}>
                                        <PreviousIcon/>
                                    </div>
                                    </div>
                                    <div className="relative h-[40px] w-[40px]]">
                                    <div className="cursor-pointer" onClick={() =>  togglePlayPause()}>
                                        {isPlaying? (<PauseIcon/>) : (<PlayIcon/>)}
                                    </div>
                                    </div>
                                    <div className="relative h-6 w-6">
                                    <div className="cursor-pointer" onClick={() => handleNext()}>
                                        <NextIcon/>
                                    </div>
                                    </div>
                                    <div className="relative h-6 w-6">
                                        <div className="cursor-pointer">
                                            <RepeatIcon/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start md:pl-4 order-1 md:order-2" style={{maxWidth:"1100px", width:"100%", margin: '0 auto 0 0'}}>
                                    <ProgressBar
                                        {...{ progressBarRef, audioRef, timeProgress, duration }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center hidden md:block" style={{width: "160px"}}>                
                            <div className="flex justify-end items-center w-[140px]">
                                <div className="cursor-pointer pr-4" onClick={() => setMuteVolume((prev) => !prev)}>
                                    {muteVolume? (<MuteVolumeIcon/>) : (<VolumeIcon/>)}
                                </div>
                                <div className="flex" style={{width: "160px"}}>
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={volume}
                                    onChange={(e) => setVolumeValue(e.target.value)}
                                    style={{
                                        background: `linear-gradient(to right, #0060D9 ${volume}%, #ccc ${volume}%)`,
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 