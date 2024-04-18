import React, { useState, useContext } from 'react';
import { DragFileInput } from '../../components/DragDrop/DragFileInput';
import { ThumbnailInput } from '../../components/DragDrop/ThumbnailInput';
import { formatDuration, getFileExtension } from '../../utils/format';
import { useDispatch, useSelector } from '../../store';
import { ShowModal } from '../../store/reducers/menu';
import alert from "../../utils/Alert";
import loading from '../../utils/Loading';
import { APIContext } from '../../context/ApiContext';
import { base64ToBlob, encodeArrayBuffer, getBinaryFileSizeFromBase64} from '../../utils/format.js';
import { Principal } from '@dfinity/principal';
import { UploadSong } from "../../store/reducers/auth";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { Logout } from '../../store/reducers/auth';

function UploadSongModal() {
    const {user} = useSelector((state) => (state.auth));
    const MAX_CHUNK_SIZE = 1024 * 500; // 500kb
    const { createContentInfo, processAndUploadChunk } = useContext(APIContext);
    const dispatch = useDispatch();
    const history = useHistory();

    const [audioInfo, setAudioInfo] = useState({
        duration: 0,
        size: 0,
        type: '',
        name: '',
        data: null,
    });

    const [thumbnail, setThumbnail] = useState('');
    const [thumbnailType, setThumbnailType] = useState('');

    const [title, setTitle] = useState('');

    const uploadSong = async () => {
        try {
            if(!audioInfo.type) {
                alert("warning", "Please upload song file")
            } else if (!thumbnail) {
                alert("warning", "Please upload thumbnail file")
            } else if (!title) {
                alert("warning", "Please input song title")
            } else {                
                if(getBinaryFileSizeFromBase64(thumbnail) > 512000) {
                    loading(false);
                    alert('info', "Thumbnail size shouldn't be bigger than 500Kb");
                    return;
                }  
                if(audioInfo.size > 10550000) {
                    loading(false);
                    alert('info', "Audio file size shouldn't be bigger than 10MB");
                    return;
                }    
                
                let matches = thumbnail.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
                
                setThumbnailType(matches[1]);
                
                let thumbnailImage = thumbnail.replace(/^data:(.*,)?/, '');
                if ((thumbnailImage.length % 4) > 0) {
                    thumbnailImage += '='.repeat(4 - (thumbnailImage.length % 4));
                }
               
                const imageBlob = base64ToBlob(thumbnailImage, thumbnailType);
                
                let bsf = await imageBlob.arrayBuffer();
                
                loading(true);
    
                let songFileInfo = {
                    userId: Principal.from(user.principal),
                    userCanisterId: Principal.from(user.canisterId),
                    title: title,
                    createdAt : Number(Date.now() * 1000),      
                    chunkCount: Number(Math.ceil(audioInfo.size / MAX_CHUNK_SIZE)),
                    fileType: audioInfo.type,
                    size: audioInfo.size,
                    duration: parseInt(audioInfo.duration, 10),
                    thumbnail: {
                        fileType : matches[1],
                        file : encodeArrayBuffer(bsf)
                    }
                }

                const result = await createContentInfo(songFileInfo);

                if(result[0] != null) {
                    const contentCanisterId = result[0][1];
                    const contentId = result[0][0];    
                    const putChunkPromises = [];

                    console.log("contentCanisterId", contentCanisterId.toText())

                    let chunk = 1;
                    for (let byteStart = 0; byteStart < audioInfo.size; byteStart += MAX_CHUNK_SIZE, chunk++ ) {
                        putChunkPromises.push(
                            processAndUploadChunk(audioInfo.data, byteStart, contentId, contentCanisterId, chunk, audioInfo.size)
                        );
                    }

                    const putResult = await Promise.all(putChunkPromises);

                    console.log(putResult);
                    loading(false);

                    dispatch(UploadSong());

                    dispatch(ShowModal(""))
                    alert('success', "Success on uploading song");
                } else {
                    history.push("/");
                    dispatch(Logout({}));

                    loading(false);
                    alert('warning', "Failure on uploading song");
                }
            }
        } catch (error) {
            loading(false);
            console.log(error.message)
        }
    }

    const close = () => {
        setAudioInfo({
            duration: 0,
            size: 0,
            type: '',
            name: '',
            data: null,
        })

        dispatch(ShowModal(""));
    }

    const uploadFiles = (file) => {
        if (file && file.type.startsWith('audio/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const audio = new Audio(e.target.result);
                audio.onloadedmetadata = () => {
                    console.log(audio.duration);
                    
                    let encoded = e.target.result.toString().replace(/^data:(.*,)?/, '');
                    if ((encoded.length % 4) > 0) {
                        encoded += '='.repeat(4 - (encoded.length % 4));
                    }
                    const blob = base64ToBlob(encoded, file.type);

                    setAudioInfo({
                        duration: audio.duration,
                        size: file.size,
                        type: file.type,
                        name: file.name,
                        data: blob
                    });
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleThumbnail = async (image) => {
        setThumbnail(image);
    }

    return (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center text-white">
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="flex w-full flex-row justify-center items-center px-4">
                    <div style={{maxWidth: "569px", maxHeight: '866px', margin: '0 auto', backgroundColor: "rgba(22, 28, 42, 0.95)"}} className="w-full p-4 sm:p-6 md:p-8 gap-[20px] bg-opacity-40 rounded-5 shadow-bottom_1 flex justify-start flex-col items-center">                    
                        <p className="font-plus text-white font-normal text-24 leading-30">Upload Song</p>
                        <div className="relative flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">Song upload</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <div className="flex w-full items-center justify-center">
                            <DragFileInput
                                onUpload={uploadFiles}
                                formats={["mpeg", "wav", "wma", "ogg"]}
                            />
                            </div>
                        </div>
                        <div className="relative flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">Thumbnail upload</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <div className="flex w-full items-center justify-center z-40">
                            <ThumbnailInput setThumbnail={handleThumbnail}/>
                            </div>
                        </div>
                        <div className="relative flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">Song Title</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <input className="bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" value={title} style={{height: '36px'}} onChange={(e) => setTitle(e.target.value)}></input>
                        </div>
                        <div className="relative flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">File Format</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <input readOnly className="disabled bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" value={audioInfo.type} style={{height: '36px'}}></input>
                        </div>
                        <div className="relative flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">Duration</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <input readOnly className="disabled bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" value={audioInfo.duration == 0 ? "" : formatDuration(audioInfo.duration)} style={{height: '36px'}}></input>
                        </div>
                        <div className="flex flex-row justify-between items-center w-full gap-[30px] w-[231px] pt-2">
                            <a className="outline-btn text-12 px-4 py-2 font-medium rounded-8 w-full cursor-pointer" 
                                style={{border: '2px solid white', textAlign: 'center'}} onClick={() => close()}>Cancel</a>
                            <a className="fill-btn text-12 px-4 py-2 text-white font-medium bg-darkblue-600 rounded-8 w-full flex flex-row justify-center gap-45 items-center" onClick={() => uploadSong()}
                                style={{textAlign: 'center', cursor: 'pointer'}}>
                                <p className='text-white font-medium'>Upload</p>
                                <img className="" src="/demo/assets/arrow-add.svg"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadSongModal;