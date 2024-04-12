import React, { useState } from 'react';
import { AvatarInput } from '../DragDrop/AvatarInput';
import { useDispatch } from '../../store';
import { ShowModal } from '../../store/reducers/menu';

function ProfileEditModal() {
    const dispatch = useDispatch();

    const handleThumbnail = async (image) => {
        const response = await fetch(image);
        const blob = await response.blob(); // Convert the response to a blob
                
        console.log("blob", blob);
    }

    return (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center text-white">
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="flex w-full flex-row justify-center items-center px-4">
                    <div style={{maxWidth: "469px", maxHeight: '666px', margin: '0 auto', backgroundColor: "rgba(22, 28, 42, 0.95)"}} className="w-full p-4 sm:p-6 md:p-8 gap-[20px] bg-opacity-40 rounded-5 shadow-bottom_1 flex justify-start flex-col items-center">                    
                        <p className="text-white font-plus font-bold text-18 leading-22">Profile details</p>
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className="relative cursor-pointer flex justify-center items-center z-20">
                                <AvatarInput setThumbnail={handleThumbnail}/>
                            </div>                                
                        </div>
                        <div className="relative flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">Display name</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <input className="bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" style={{height: '36px'}}></input>
                        </div>
                        <div className="relative flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">User name</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <input className="bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" style={{height: '36px'}}></input>
                        </div>
                        <div className="relative flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">Principal</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <input readOnly className="bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" style={{height: '36px'}}></input>
                        </div>
                        <div className="flex flex-row justify-between items-center w-full gap-[30px] w-[231px] pt-2">
                            <a className="outline-btn text-12 px-4 py-2 font-medium rounded-8 w-full cursor-pointer" 
                                style={{border: '2px solid white', textAlign: 'center'}} onClick={() => dispatch(ShowModal(""))}>Cancel</a>
                            <a className="fill-btn text-12 px-4 py-2 text-white font-medium bg-darkblue-600 rounded-8 w-full flex flex-row justify-center gap-45 items-center" 
                                style={{textAlign: 'center', cursor: 'pointer'}}>
                                <img className="" src="/demo/assets/save.svg"/>
                                <p className='text-white font-medium'>Save</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileEditModal;