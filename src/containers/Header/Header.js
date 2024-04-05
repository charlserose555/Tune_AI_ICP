import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import {
  NotificationIcon, ProfileIcon, LogoutIcon
} from "../../icons";
import { Avatar, Badge, Dropdown, DropdownItem } from "@windmill/react-ui";
import { useDispatch, useSelector } from "../../store";
import { Logout, SetBalances, UpdateBalances } from "../../store/reducers/auth";
import debounce from "lodash.debounce";
import useApi from "../../hooks/useApi";
import { BASE_URL } from '../../config';
import { Fragment } from 'react';
import { Menu } from '@headlessui/react';

function Header() {
  const { toggleSidebar } = useContext(SidebarContext);
  const dispatch = useDispatch();
  const Api = useApi();
  const { user } = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);
  const { balances } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const [avatar, setAvatar] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const getBalances = () => {
    Api.getBalances().then(({ data }) => {
      dispatch(SetBalances(data));
    });
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      getBalances();
    }
  }, [auth.isLoggedIn]);

  useEffect(() => {
    if (balances && auth) {
      const cbalance = balances?.find(
        (balance) => balance.disabled === false && balance.status === true
      );
      if (!cbalance || !auth) return;
      if (
        auth.balanceId !== cbalance?._id ||
        auth.currencyId !== cbalance?.currency._id
      ) {
        dispatch(UpdateBalances(cbalance));
      }
    }
  }, [balances, auth]);

  useEffect(() => {
    setAvatar(auth.user?.avatar);
  }, [auth.user]);

  function handleProfileClick() {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  }

  return (
    <div
      className={`absolute top-0 right-0 z-40 bg-transparent pt-4 pr-4 h-16 flex justify-end flex flex-row items-end`}
    >
      <div className="w-full h-27 flex flex-row justify-end">
        <button class="flex items-center justify-center">
          <div className="notification-icon" style={{borderRadius: "50%"}}>
            <NotificationIcon/>
          </div>
        </button>  
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="user-profile-section flex flex-row justify-between items-center transition-all duration-200 ease-in-out">
              <div className="relative">
                <Avatar
                  className="absolute top-0 left-0 align-middle"
                  src={'/demo/assets/avatar.png'}
                  alt=""
                  aria-hidden="true"
                />
                <span className="absolute bg-darkblue-500 w-[12px] h-[12px]" style={{top:"-2px", left:"21px", borderRadius: "50%", border: "solid 1px #FFFFFF"}}></span>
              </div>
              <p className="profile-user-name font-plus">
                Jenny Wilson
              </p>
              <img src="/demo/assets/expand_more.svg" style={{width: "20px", height: "20px"}}/>
            </Menu.Button>
          </div>
          <Menu.Items className="absolute right-0 mt-1 w-64 origin-top-right bg-secondary-700 divide-y bg-opacity-95 divide-gray-100 rounded-lg text-white shadow-bottom_1 transition-all duration-200 ease-in-out" >
            <div className="py-2 px-45 gap-[10px]">
              <Menu.Item>
                {({ active }) => (
                  <div className={`menu-item flex justify-row items-center flex start px-45 mb-[10px] gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800`}>
                    <ProfileIcon/>
                    <a
                      href="#"
                      className="block py-2 font-plus font-bold text-14 leading-[19px]"
                    >
                      Profile
                    </a>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div className={`menu-item flex justify-row items-center flex start px-45 gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800`}>
                    <LogoutIcon/>
                    <a
                      href="#"
                      className="block py-2 font-plus font-bold text-14 leading-[19px]"
                    >
                      Log out
                    </a>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
