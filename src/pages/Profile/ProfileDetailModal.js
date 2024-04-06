import React, { useState } from 'react';
import { EditProfileIcon } from '../../icons';
import { Avatar } from "@windmill/react-ui";

function ProfileEditModal({ isOpen, onClose }) {
    const [showPassword, setShowPassword] = useState(false);
    
    if (!isOpen) {
        return null;
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        console.log(showPassword)
    };

    return (
        <div className="overlay fixed inset-0 z-50 flex items-center justify-center">
            <div className="overlay absolute inset-0 bg-black opacity-80"></div>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="flex w-full flex-row justify-center items-center px-4">
                    <div></div>
                    <div style={{maxWidth: "469px", maxHeight: '666px', margin: '0 auto', backgroundColor: "rgba(22, 28, 42, 0.75)"}} className="w-full p-4 sm:p-6 md:p-8 gap-[20px] bg-opacity-40 rounded-5 shadow-bottom_1 flex justify-start flex-col items-center">                    
                        <p className="text-white font-plus font-bold text-18 leading-22">Profile details</p>
                        <div className="flex flex-col justify-center items-center w-full gap-[10px]">
                            <div className="relative cursor-pointer flex justify-center items-center"
                                style={{width:"100px", height:"100px"}}>
                                <div className='absolute top-0 left-0' style={{width:"100px", height:"100px"}}>
                                <Avatar
                                    className="cursor-pointer absolute top-0 left-0"
                                    style={{width:"100px", height:"100px", borderRadius:"50%"}}                
                                    src={'/demo/assets/banner_profile_icon.png'}
                                    alt=""
                                    aria-hidden="true"
                                    />                                    
                                </div>
                                <div className='absolute top-0 left-0' style={{width:"100px", height:"100px", borderRadius:"50%", backgroundColor: "rgba(0, 0, 0, 0.45)"}}></div>
                                <div style={{width:"30px", height:"30px", zIndex:"100"}}>
                                    <EditProfileIcon/>
                                </div>
                            </div>                                
                            <p className="font-plus text-white font-normal text-24 leading-30">Jenny Wilson</p>
                            <p className="text-14 text-white font-plus text-normal">Joined 05 March 22</p>
                        </div>
                        <div className="relative z-20 flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">Full name</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <input className="bg-primary-700 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" style={{height: '36px'}}></input>
                        </div>
                        <div className="flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <p className="font-plus text-white font-light text-14 leading-20">E-mall</p>
                                <p className="text-14 text-coral-500">*</p>
                            </div>
                            <input type="email" className="bg-primary-700 opacity-100 py-2 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" style={{height: '36px'}}></input>
                        </div>
                        <div className="flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <label className="font-plus text-white font-light text-14 leading-20">Change Password</label>
                                <label className="text-14 text-coral-500">*</label>
                            </div>
                            <div className="relative flex items-center">
                                <input  type={showPassword ? "text" : "password"} className="bg-primary-700 opacity-100 py-2 w-full px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" style={{height: '36px'}}></input>
                                <button className="w-[24px] h-[24px] absolute right-4 cursor-point" onClick={togglePasswordVisibility}>{showPassword? ( <img src="/demo/assets/eye_hidden.svg" className="w-[24px] h-[24px]"/>) : 
                                (<img src="/demo/assets/eye_show.svg" className="w-[24px] h-[24px]"/>)}</button>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start w-full gap-[5px]">
                            <div className="flex flex-row justify-start items-center">
                                <label className="font-plus text-white font-light text-14 leading-20">TunedCoin Wallet Address</label>
                                <label className="text-14 text-coral-500">*</label>
                            </div>
                            <div className="relative flex items-center">
                                <input  type={showPassword ? "text" : "password"} className="bg-primary-700 opacity-100 py-2 w-full px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent focus:border-transparent focus:ring-0" style={{height: '36px'}}></input>
                                <button className="w-[24px] h-[24px] absolute right-4 cursor-point" onClick={togglePasswordVisibility}>{showPassword? ( <img src="/demo/assets/eye_hidden.svg" className="w-[24px] h-[24px]"/>) : 
                                (<img src="/demo/assets/eye_show.svg" className="w-[24px] h-[24px]"/>)}</button>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center w-full gap-[30px] w-[231px] pt-2">
                            <a className="outline-btn text-12 px-4 py-2 font-medium rounded-8 w-full cursor-pointer" 
                                style={{border: '2px solid white', textAlign: 'center'}} onClick={onClose}>Cancel</a>
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