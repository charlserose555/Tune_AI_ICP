import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "../../store";
import { Avatar } from "@windmill/react-ui";
import { EditProfileIcon, SubscriptionIcon } from "../../icons";
import { Menu } from '@headlessui/react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProfileEditModal from "../../components/Popups/ProfileEditModal";
import { ShowModal } from "../../store/reducers/menu";

export default function ProfileBanner() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {

  // }, [user])

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
          <div className="flex flex-row hidden lg:block justify-start absolute top-6 left-9">
              <img src="/demo/assets/back.svg" className="cursor-pointer" onClick={() => history.goBack()}></img>
          </div>
          <div className="flex flex-row justify-start gap-[33px] items-center absolute top-16 left-9">
            <Avatar
                className="cursor-pointer w-[70px] h-[70px] md:w-[80px] md:h-[80px] lg:w-[142px] lg:h-[142px]"
                src={user.avatar? user.avatar : "/demo/assets/avatar.png"}
                alt=""
                aria-hidden="true"
              />
            <div className="flex flex-col gap-[10px]">
              <h1 className="font-plus-bold font-normal text-[24px] md:text-[40px] text-white leading-[40px]">{user.displayname}</h1>
              <p className="font-plus text-11 text-white">{user.username}</p>
              <a className="outline-btn text-11 font-medium rounded-[20px]" 
                style={{border: '2px solid white', textAlign: 'center', cursor: 'pointer'}}>Follow</a>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full" style={{ height:"157px", background: "linear-gradient(180deg, rgba(26, 26, 33, 0) 25.67%, #1A1A21 99.15%)"}}>
          </div>
      </div>

      {/* <ProfileEditModal isOpen={isModalOpen} onClose={closeModal}/> */}
    </div>
  );
}
