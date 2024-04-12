import React, { useState } from 'react';
import { DragFileInput } from '../../components/DragDrop/DragFileInput';
import { ThumbnailInput } from '../../components/DragDrop/ThumbnailInput';
import { formatDuration } from '../../utils/format';

function UploadSongModal({ isOpen, onClose }) {
    const [audioInfo, setAudioInfo] = useState({
        duration: 0,
        size: 0,
        type: '',
        name: ''
    });

    const close = () => {
        setAudioInfo({
            duration: 0,
            size: 0,
            type: '',
            name: ''
        })
        onClose();
    }

    if (!isOpen) {
        return null;
    }

    const uploadFiles = (file) => {
        if (file && file.type.startsWith('audio/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const audio = new Audio(e.target.result);
                audio.onloadedmetadata = () => {
                    console.log(audio.duration);

                    setAudioInfo({
                        duration: formatDuration(audio.duration),
                        size: file.size,
                        type: file.type,
                        name: file.name
                    });
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleThumbnail = async (image) => {
        const response = await fetch(image);
        const blob = await response.blob(); // Convert the response to a blob
                
        console.log("blob", blob);
    }

    return (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center">
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
                            <input className="bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" style={{height: '36px'}}></input>
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
                            <input readOnly className="disabled bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" value={audioInfo.duration == 0 ? "" : audioInfo.duration} style={{height: '36px'}}></input>
                        </div>
                        <div className="flex flex-row justify-between items-center w-full gap-[30px] w-[231px] pt-2">
                            <a className="outline-btn text-12 px-4 py-2 font-medium rounded-8 w-full cursor-pointer" 
                                style={{border: '2px solid white', textAlign: 'center'}} onClick={() => close()}>Cancel</a>
                            <a className="fill-btn text-12 px-4 py-2 text-white font-medium bg-darkblue-600 rounded-8 w-full flex flex-row justify-center gap-45 items-center" 
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