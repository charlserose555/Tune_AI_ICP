import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import {
  HomeIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineLeaderboardIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
  WalletIcon,
} from "../../icons";
import { Avatar, Badge, Dropdown, DropdownItem } from "@windmill/react-ui";
import { useDispatch, useSelector } from "../../store";
import { Logout, SetBalances, UpdateBalances } from "../../store/reducers/auth";
import { ChangePage } from "../../store/reducers/menu";
import debounce from "lodash.debounce";
import useApi from "../../hooks/useApi";
import { BASE_URL } from '../../config';

function Header() {
  const { toggleSidebar } = useContext(SidebarContext);
  const dispatch = useDispatch();
  const Api = useApi();
  const { user } = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);
  const { balances } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isPlaying, isSports } = useSelector((state) => state.menu);
  const [avatar, setAvatar] = useState('');

  const getBalances = () => {
    Api.getBalances().then(({ data }) => {
      dispatch(SetBalances(data));
    });
  };

  const changeCurrency = async (acurrency, index) => {
    Api.changeCurrency(acurrency._id)
      .then(({ data }) => {
        getBalances();
      })
      .catch((error) => {
        console.log(error);
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

  function handleWalletClick() {
    setIsWalletMenuOpen(!isWalletMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  return (
    <header
      className={`z-40 bg-secondary-700 pt-4 pr-4 h-16 flex justify-end flex-row`}
    >
      <div className="w-full h-27 flex flex-row justify-end">
        <button class="flex items-center justify-center">
          <img src="/demo/assets/notification.svg"/>
        </button>
        <div className="user-profile-section flex flex-row justify-between items-center">
          <Avatar
            className="align-middle"
            src={avatar ? `${BASE_URL}/${avatar}` : '/demo/assets/avatar.png'}
            alt=""
            aria-hidden="true"
          />
          <p className="profile-user-name">
            Jenny Wilson
          </p>
          <img src="/demo/assets/expand_more.svg" style={{width: "20px", height: "20px"}}/>
        </div>        
      </div>
    </header>
  );
}

export default Header;
