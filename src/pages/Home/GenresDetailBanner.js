import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "../../store";
import { Avatar } from "@windmill/react-ui";
import { EditProfileIcon, SubscriptionIcon } from "../../icons";
import { Menu } from '@headlessui/react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";

export default function GenresDetailBanner() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id, demo } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="font-plus flex flex-col text-white relative">
      <div
        className="flex flex-col justify-start"
        style={{ height: "300px", backgroundImage: 'url("/demo/assets/profile_banner.png")',
              backgroundRepeat: "no-repat",
              backgroundSize: "cover",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              opacity: "95%",
              backgroundBlendMode: "multiply"}}>
          <div className="flex flex-row justify-start gap-[33px] items-center absolute top-16 left-9">
            <Avatar
                className="cursor-pointer"
                style={{width:"142px", height:"142px"}}                
                src={'/demo/assets/banner_profile_icon.png'}
                alt=""
                aria-hidden="true"
              />
            <div className="flex flex-col gap-[10px] cursor-pointer">
              <h1 className="font-plus-bold font-normal text-[40px] text-white leading-[50px] cursor-pointer">Jenny Wilson</h1>
              <h5 className="font-plus font-light text-sm text-white leading-[17px]">Joined 05 March22</h5>
            </div>
          </div>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group" style={{position:"absolute", width:"40px", height:"40px", top:"145px", zIndex:"100", right:"42px", cursor:"pointer", pointerEvents: 'auto'}}>
                <img style={{transition:".3s all ease-out"}} className="opacity-100 group-hover:opacity-0 absolute right-0 top-0 rounded-full" src="/demo/assets/profile_banner_option.svg"></img>
                <img style={{transition:".3s all ease-out"}} className="opacity-0 group-hover:opacity-100 absolute right-0 top-0 rounded-full" src="/demo/assets/profile_banner_option_hover.svg"></img>
              </Menu.Button>
            </div>
            <Menu.Items 
              style={{position:"absolute", top:"185px", right:"42px", zIndex: "100"}}
              className="mt-1 w-64 origin-top-right bg-secondary-700 divide-y bg-opacity-95 divide-gray-100 rounded-lg text-white shadow-bottom_1 transition-all duration-200 ease-in-out" >
              <div className="py-2 px-45 gap-[10px]">
                <Menu.Item>
                  {({ active }) => (
                    <div onClick={() => openModal()} className={`menu-item flex justify-row items-center flex start px-45 mb-[10px] gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800`}>
                      <EditProfileIcon/>
                      <a
                        className="block py-2 font-plus font-bold text-14 leading-[19px]"
                      >
                        Edit profile
                      </a>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div className={`menu-item flex justify-row items-center flex start px-45 gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800`}>
                      <SubscriptionIcon/>
                      <a
                        className="block py-2 font-plus font-bold text-14 leading-[19px]"
                      >
                        subscription
                      </a>
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
          <div className="absolute bottom-0 left-0 w-full" style={{ height:"157px", background: "linear-gradient(180deg, rgba(26, 26, 33, 0) 25.67%, #1A1A21 99.15%)"}}>
          </div>
      </div>
    </div>
  );
}
