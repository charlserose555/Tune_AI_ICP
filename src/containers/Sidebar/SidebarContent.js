import React, { useState } from "react";
import routes from "../../routes/sidebar";
import { NavLink, Route, Link } from "react-router-dom";
import * as Icons from "../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { Badge, Dropdown, DropdownItem } from "@windmill/react-ui";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "../../store";
import { ChangePage } from "../../store/reducers/menu";
import { red } from "tailwindcss/colors";

// function Icon({ icon, ...props }) {
//   const Icon = Icons[icon];
//   return <Icon {...props} />;
// }

function SidebarContent() {
  const dispatch = useDispatch();

  function HomeIcon() {
    return (
      <svg className="nav-icon" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.5156 15.6738L16.8672 7.74414C16.5156 7.43164 16.0078 7.27539 15.5 7.27539C14.9531 7.27539 14.4453 7.43164 14.0938 7.74414L4.44531 15.6738C4.32812 15.791 4.25 15.9473 4.25 16.1426C4.25 16.2988 4.28906 16.4551 4.36719 16.5332L4.79688 17.041C4.875 17.1582 5.07031 17.2363 5.26562 17.2363C5.42188 17.2363 5.53906 17.1973 5.65625 17.1191L6.75 16.2207V23.4863C6.75 24.1895 7.29688 24.7363 8 24.7363H13C13.6641 24.7363 14.2109 24.1895 14.25 23.4863V19.4238H16.75V23.4863C16.75 24.1895 17.2969 24.7363 18 24.7363H23C23.6641 24.7363 24.2109 24.1895 24.25 23.5254V16.2207L25.3047 17.1191C25.4219 17.1973 25.5391 17.2754 25.6953 17.2754C25.8906 17.2754 26.0859 17.1582 26.2031 17.041L26.5938 16.5332C26.6719 16.4551 26.75 16.2988 26.75 16.1426C26.75 15.9473 26.6328 15.791 26.5156 15.6738ZM22.3359 22.8613H18.625V18.7988C18.5859 18.1348 18.0391 17.5879 17.375 17.5488H13.625C12.9219 17.5879 12.375 18.1348 12.375 18.7988V22.8613H8.625V14.6973L15.5 9.0332L22.375 14.6973L22.3359 22.8613Z" fill="#A4A4A4"/>
      </svg>
    );
  } 

  function GenersIcon() {
    return (
      <svg className="nav-icon" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.875 10.0488C24.875 9.54102 24.4453 9.11133 23.9375 9.11133H7.0625C6.51562 9.11133 6.125 9.54102 6.125 10.0488V10.9863H24.875V10.0488ZM24.25 6.92383C24.25 6.41602 23.8203 5.98633 23.3125 5.98633H7.6875C7.14062 5.98633 6.75 6.41602 6.75 6.92383V7.86133H24.25V6.92383ZM24.25 12.2363H6.75C6.04688 12.2363 5.5 12.8223 5.5 13.4863C5.5 13.5254 5.5 13.5645 5.5 13.6035L6.51562 24.8535C6.55469 25.5176 7.10156 25.9863 7.76562 25.9863H23.1953C23.8594 25.9863 24.4062 25.5176 24.4453 24.8535L25.4609 13.6035C25.4609 13.5645 25.5 13.5254 25.5 13.4863C25.5 12.8223 24.9141 12.2363 24.25 12.2363ZM22.6484 24.1113H8.3125L7.41406 14.1113H23.5469L22.6484 24.1113ZM15.5 23.4863C18.625 23.4863 21.2812 21.7285 21.4375 19.4238C21.5938 17.002 18.9375 14.9707 15.4609 14.9707C12.0234 14.9707 9.36719 17.041 9.52344 19.4238C9.67969 21.7285 12.3359 23.4863 15.5 23.4863ZM15.5 18.7988C16.0469 18.7988 16.5156 19.1504 16.5156 19.541C16.5156 19.9707 16.0469 20.2832 15.5 20.2832C14.9141 20.2832 14.4844 19.9707 14.4453 19.541C14.4453 19.1504 14.9141 18.7988 15.5 18.7988Z" fill="#A4A4A4"/>
      </svg>
    );
  } 

  function FavouriteIcon() {
    return (
      <svg className="nav-icon" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.8751 12.7042L19.172 11.8839L16.5938 6.68855C16.1642 5.79012 14.836 5.75105 14.3673 6.68855L11.8282 11.8839L6.08604 12.7042C5.07041 12.8604 4.67979 14.1104 5.42197 14.8526L9.52354 18.8761L8.54697 24.5401C8.39072 25.5557 9.48447 26.337 10.3829 25.8682L15.5001 23.1729L20.5782 25.8682C21.4767 26.337 22.5704 25.5557 22.4142 24.5401L21.4376 18.8761L25.5392 14.8526C26.2813 14.1104 25.8907 12.8604 24.8751 12.7042ZM19.4063 18.212L20.3438 23.6026L15.5001 21.0636L10.6173 23.6026L11.5548 18.212L7.60947 14.3839L13.0392 13.6026L15.5001 8.68074L17.922 13.6026L23.3517 14.3839L19.4063 18.212Z" fill="#A4A4A4"/>
      </svg>
    );
  } 

  const { isLoggedIn, balance, token, user } = useSelector((state) => state.auth);
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);

  function handleWalletClick() {
    setIsWalletMenuOpen(!isWalletMenuOpen);
  }

  return (
    <div className="text-gray-500 dark:text-gray-400 font-normal font-plus text-16 h-full" style={{padding: "20px 10px", fontStretch: "wider"}}>
      <div className="flex flex-col gap-2 h-full">
        <img src="/demo/assets/header.svg" alt="Tuned AI" />
        <div className="flex flex-row justify-start items-center pt-5 px-3 gap-45">
          <ul className="w-full gap-45 flex flex-col">
            {routes.map((route) =>
              <li className="relative rounded-2 text-white hover:bg-primary-700 active:bg-primary-700" key={route.name}>
                <NavLink
                  exact
                  to={route.path}
                  className="parent-navlink inline-flex gap-45 rounded-2 py-45 px-4 items-center w-full duration-150"
                  activeClassName="parent-navlink-active bg-primary-700">
                  <Route path={route.path} exact={route.exact}>
                  </Route>
                    <span className="nav-border absolute inset-y-0 left-0 w-1 rounded-tl-2 rounded-bl-2"></span>                    
                    {route.name == "Home" && <HomeIcon/>}
                    {route.name == "Geners" && <GenersIcon/>}
                    {route.name == "Favorites" && <FavouriteIcon/>}
                  <span className="leading-20">{route.name}</span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-col justify-end items-center text-white font-plus h-full px-3" style={{paddingBottom: "120px"}}>          
            <div className="flex flex-col p-4 bg-primary-900 rounded-4 gap-4">
              <p className="text-16 font-semibold leading-20">You can receive part of the royalties of a song, just by listening it</p>
              <p className="text-14 font-light leading-18">All the royalties will be distributed using our own TunedCoin token</p>
              <a className="text-14 px-4 py-2 font-medium bg-blue-600 rounded-8 w-full flex flex-row justify-center gap-45 items-center" style={{textAlign: 'center', cursor: 'pointer'}}>Connect Wallet
                <img className="" src="/demo/assets/arrow-right.svg"/>
              </a>
            </div>

            <p className="text-14 font-light leading-18 pt-2">Loremipsu © 2022 Versión 1.1</p>            
        </div>
        
      </div>
    </div>
  );
}

export default SidebarContent;
