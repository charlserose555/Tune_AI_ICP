import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import {
  NotificationIcon, ProfileIcon, LogoutIcon, MenuIcon
} from "../../icons";
import { Avatar, Badge, Dropdown, DropdownItem } from "@windmill/react-ui";
import { useDispatch, useSelector } from "../../store";
import { Logout, SetBalances, UpdateBalances } from "../../store/reducers/auth";
import debounce from "lodash.debounce";
import useApi from "../../hooks/useApi";
import { BASE_URL } from '../../config';
import { Fragment } from 'react';
import { Menu } from '@headlessui/react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from 'react-router-dom';

function Header() {
  const history = useHistory();
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

  const logout = () => {
    console.log("DFsfdf");
    dispatch(Logout({}))
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
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
    <>
      <div className={`absolute top-2 left-5 z-40 bg-transparent pt-4 pr-4 h-16 flex justify-start flex flex-row items-start`}>
        <div className="flex flex-row justify-start">
          <button
            className="p-1 mr-2 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
            onClick={toggleSidebar}
            aria-label="Menu"
          >
            <MenuIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className={`absolute top-0 right-0 z-40 bg-transparent pt-4 pr-4 h-16 flex justify-end flex flex-row items-end`}
      >
        {auth.isLoggedIn &&
          <div className="w-full h-27 flex flex-row justify-end">
            <button class="flex items-center justify-center">
              <div className="notification-icon" style={{borderRadius: "50%"}}>
                <NotificationIcon/>
              </div>
            </button>  

            
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="user-profile-section ml-[10px] lg:ml-[30px] flex flex-row justify-between items-center transition-all duration-200 ease-in-out">
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
              <Menu.Items 
                className="absolute right-0 mt-1 w-64 origin-top-right bg-secondary-700 divide-y bg-opacity-95 divide-gray-100 rounded-lg text-white shadow-bottom_1 transition-all duration-200 ease-in-out" >
                <div className="py-2 px-45 gap-[10px]">
                  <Menu.Item>
                    {({ active }) => (
                      <div onClick={() => history.push("/app/profile")} className={`menu-item flex justify-row items-center flex start px-45 mb-[10px] gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800`}>
                        <ProfileIcon/>
                        <a
                          className="block py-2 font-plus font-bold text-14 leading-[19px]"
                        >
                          Profile
                        </a>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div className={`menu-item flex justify-row items-center flex start px-45 gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800`} onClick={() => logout()}>
                        <LogoutIcon/>
                        <a
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
          </div>}
      </div>
    </>
  );
}

export default Header;
