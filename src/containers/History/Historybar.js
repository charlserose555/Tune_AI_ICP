import React, { useState } from "react";
import routes from "../../routes/sidebar";
import { NavLink, Route } from "react-router-dom";
import * as Icons from "../../icons";
import { Badge, Dropdown, DropdownItem } from "@windmill/react-ui";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "../../store";
import { ChangePage } from "../../store/reducers/menu";
import { white } from "tailwindcss/colors";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function Historybar() {
  const dispatch = useDispatch();

  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);

  function handleWalletClick() {
    setIsWalletMenuOpen(!isWalletMenuOpen);
  }

  return (
    <div className="z-30 flex flex-col flex-shrink-0 overflow-y-auto w-69 block font-plus text-white" style={{borderLeft: "1px solid #2F2D3B"}}>
        <div className="flex flex-row justify-start items-center gap-3 pt-6 pl-2">
          <img src="/demo/assets/history.svg" className="w-6 h-6" alt="History"/>
          <p className="font-light text-20 leading-25 ">History</p>
        </div>
        <div className="pt-2 pl-2 pr-6 flex flex-col">
          <div className="p-45 gap-45 flex flex-row justify-start items-center" style={{borderBottom: "1px solid #2F2D3B"}}>
            <img className="rounded-2 w-26 h-26" src="/demo/assets/avatar_play.png"/>
            <div className="flex flex-col justify-around">
              <div className="font-light text-14 leading-18">Lorem ipsum dolor.....</div>
              <div className="font-light text-14 leading-18">Lorem ipsum dolor ...</div>
            </div>
          </div>
          <div className="p-45 gap-45 flex flex-row justify-start items-center" style={{borderBottom: "1px solid #2F2D3B"}}>
            <img className="rounded-2 w-26 h-26" src="/demo/assets/avatar_play.png"/>
            <div className="flex flex-col justify-around">
              <div className="font-light text-14 leading-18">Lorem ipsum dolor.....</div>
              <div className="font-light text-14 leading-18">Lorem ipsum dolor ...</div>
            </div>
          </div>
          <div className="p-45 gap-45 flex flex-row justify-start items-center" style={{borderBottom: "1px solid #2F2D3B"}}>
            <img className="rounded-2 w-26 h-26" src="/demo/assets/avatar_play.png"/>
            <div className="flex flex-col justify-around">
              <div className="font-light text-14 leading-18">Lorem ipsum dolor.....</div>
              <div className="font-light text-14 leading-18">Lorem ipsum dolor ...</div>
            </div>
          </div>
          <div className="p-45 gap-45 flex flex-row justify-start items-center" style={{borderBottom: "1px solid #2F2D3B"}}>
            <img className="rounded-2 w-26 h-26" src="/demo/assets/avatar_play.png"/>
            <div className="flex flex-col justify-around">
              <div className="font-light text-14 leading-18">Lorem ipsum dolor.....</div>
              <div className="font-light text-14 leading-18">Lorem ipsum dolor ...</div>
            </div>
          </div>
        </div>
        <div className="pt-12 flex flex-row justify-center px-6 w-full gap-1">
          <div className="shadow-lg rounded-4 flex flex-col justify-end items-center p-2" style={{
            width: '247px',
            height: '334px',
            backgroundImage: 'url("/demo/assets/portrait.png")',
            backgroundRepeat: "no-repat",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
          }}>
            <div className="items-center flex justify-center flex-col">
              <p className="text-18 font-light leading-22 tracking-wide">Access now and</p>
              <p className="text-18 font-light leading-22 tracking-wide">start to win</p>              
            </div>
            <div className="flex flex-row justify-center items-center">
              <img className="" src="/demo/assets/ethereum.svg"/>
              <img className="" src="/demo/assets/bitcoin.svg"/>
            </div>
            <div className="flex flex-col justify-between items-center gap-8 w-full px-4 pb-2">
              <a className="text-12 px-4 py-2 font-medium rounded-8 w-full" style={{border: '2px solid white', textAlign: 'center', cursor: 'pointer'}}>Login</a>
              <a className="text-12 px-4 py-2 font-medium bg-blue-600 rounded-8 w-full flex flex-row justify-center gap-45 items-center" style={{textAlign: 'center', cursor: 'pointer'}}>Register
                <img className="" src="/demo/assets/arrow-right.svg"/>
              </a>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Historybar;
