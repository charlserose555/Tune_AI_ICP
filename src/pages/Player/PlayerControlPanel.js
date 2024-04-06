
import { NextIcon, PreviousIcon, RandomIcon, RepeatIcon, ResumeIcon, VolumeIcon } from "../../icons";
import { Slider } from "@material-tailwind/react";

export default function PlayerControlPanel() {
    return (
        <>
            <div className="absolute font-plus text-white bottom-0 left-0 w-full z-40" style={{boxShadow: "0px -20px 40px rgba(0, 0, 0, 0.45)"}}>
                <div className="flex justify-start items-center w-full bg-primary-700 w-fixed gap-[10px] py-[20px] px-[30px]">
                <div className="flex justify-start hidden md:block items-center w-[56px]">
                    <img src="/demo/assets/classic_rock.png" className="rounded-md"/>
                </div>
                <div className="flex justify-start items-center w-full">
                    <div className="flex flex-col justify-around items-start hidden lg:block  gap-[6px] pr-2">
                    <p className="text-16 font-bold leading-20">Classic rock</p>
                    <p className="text-14 font-normal leading-18">Lorem ipsum dolor sit ...</p>
                    </div>
                    <div className="flex flex-col md:flex-row flex-grow justify-start items-center md:px-3 gap-[12px]">
                    <div className="flex flex-row justify-start items-center order-2 md:order-1 gap-[13px]">
                        <div className="relative h-6 w-6">
                        <div className="cursor-pointer">
                            <RandomIcon/>
                        </div>
                        </div>
                        <div className="relative h-6 w-6">
                        <div className="cursor-pointer">
                            <PreviousIcon/>
                        </div>
                        </div>
                        <div className="relative h-[40px] w-[40px]]">
                        <div className="cursor-pointer">
                            <ResumeIcon/>
                        </div>
                        </div>
                        <div className="relative h-6 w-6">
                        <div className="cursor-pointer">
                            <NextIcon/>
                        </div>
                        </div>
                        <div className="relative h-6 w-6">
                        <div className="cursor-pointer">
                            <RepeatIcon/>
                        </div>
                        </div>
                        <div className="absolute block md:hidden right-1 sm:right-5 bottom-7">
                        <div className="cursor-pointer pr-4">
                            <VolumeIcon/>
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-start md:pl-4 order-1 md:order-2" style={{maxWidth:"1100px", width:"100%", margin: '0 auto 0 0'}}>
                        <Slider size="md"
                        barClassName="bg-darkblue-500 h-1 rounded-lg"               
                        thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[0px] [&::-webkit-slider-thumb]:-mt-[0px]"
                        trackClassName="h-1 rounded-lg [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-[#2ec946]/20"
                        defaultValue={10}/>
                    </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center hidden md:block" style={{width: "160px"}}>                
                    <div className="flex justify-end items-center w-[140px]">
                    <div className="cursor-pointer pr-4">
                        <VolumeIcon/>
                    </div>
                    <div className="flex" style={{width: "160px"}}>
                        <Slider size="md"
                        barClassName="bg-darkblue-500 h-1 rounded-lg"               
                        thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[0px] [&::-webkit-slider-thumb]:-mt-[0px]"
                        trackClassName="h-1 rounded-lg [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-[#2ec946]/20"
                        defaultValue={10}/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
} 