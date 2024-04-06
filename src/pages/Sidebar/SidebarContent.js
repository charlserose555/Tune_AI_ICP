import React, { useState } from "react";
import routes from "../../routes/sidebar";
import { NavLink, Route, Link } from "react-router-dom";
import * as Icon from "../../icons";
import { useDispatch, useSelector } from "../../store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SidebarContent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoggedIn, balance, token, user } = useSelector((state) => state.auth);
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);

  function handleWalletClick() {
    setIsWalletMenuOpen(!isWalletMenuOpen);
  }

  return (
    <div className="text-gray-500 dark:text-gray-400 font-normal font-plus text-16 h-full" style={{padding: "20px 10px"}}>
      <div className="flex flex-col 
      h-full">
        <img src="/demo/assets/header.svg" alt="Tuned AI" />
        <div className="flex flex-row justify-start items-center pt-5 px-3 gap-45">
          <ul className="w-full gap-45 flex flex-col">
            {routes.map((route) =>
              (route.icon? (<li className="navli relative rounded-2 text-white hover:bg-primary-700 active:bg-primary-700" key={route.name}>
              <NavLink
                exact
                to={`/app${route.path}`}
                className="parent-navlink inline-flex gap-45 rounded-2 py-45 px-4 items-center w-full"
                activeClassName="parent-navlink-active bg-primary-700">
                <Route path={`/app${route.path}`} exact={route.exact}>
                </Route>
                  <span className="nav-border absolute inset-y-0 left-0 w-1 rounded-tl-2 rounded-bl-2"></span>                    
                  {route.name == "Home" && <Icon.HomeIcon/>}
                  {route.name == "Geners" && <Icon.GenersIcon/>}
                  {route.name == "Favorites" && <Icon.FavoritesIcon/>}
                <span className="leading-20">{route.name}</span>
              </NavLink>
            </li>) : ("")))}
          </ul>
        </div>
        
        <div className="pt-6 text-white flex flex-row justify-center px-3 w-full gap-1 block md:hidden">
          <div className="shadow-lg rounded-4 flex flex-col justify-end items-center p-2" style={{
            width: '247px',
            height: '284px',
            backgroundImage: 'url("/demo/assets/portrait.png")',
            backgroundRepeat: "no-repat",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
          }}>
            <div className="items-center flex justify-center flex-col">
              <p className="text-18 font-normal leading-22 tracking-wide">Access now and</p>
              <p className="text-18 font-normal leading-22 tracking-wide">start to win</p>              
            </div>
            <div className="flex flex-row justify-center items-center">
              <img className="" src="/demo/assets/ethereum.svg"/>
              <img className="" src="/demo/assets/bitcoin.svg"/>
            </div>
            <div className="flex flex-col justify-between items-center gap-8 w-full px-4 pb-2">
              <a className="outline-btn text-12 px-4 py-2 font-medium rounded-8 w-full" 
                style={{border: '2px solid white', textAlign: 'center', cursor: 'pointer'}}
                onClick={() => history.push("/auth/login")}>Login</a>
              <a className="fill-btn text-12 px-4 py-2 font-medium bg-darkblue-600 rounded-8 w-full flex flex-row justify-center gap-45 items-center" 
                style={{textAlign: 'center', cursor: 'pointer'}}
                onClick={() => history.push("/auth/register")}>Register
                <img className="" src="/demo/assets/arrow-right.svg"/>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end items-center text-white font-plus h-full px-3 pt-4" style={{paddingBottom: "120px"}}>          
            <div className="flex flex-col p-4 bg-primary-900 rounded-4 gap-4">
              <p className="text-16 font-semibold leading-20">You can receive part of the royalties of a song, just by listening it</p>
              <p className="text-14 font-light leading-18">All the royalties will be distributed using our own TunedCoin token</p>
              <a className="text-14 px-4 py-2 font-medium bg-darkblue-600 rounded-8 w-full flex flex-row justify-center gap-45 items-center" style={{textAlign: 'center', cursor: 'pointer'}}>Connect Wallet
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
