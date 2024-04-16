import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { AuthClient } from "@dfinity/auth-client";
import alert from "../../utils/Alert.js";
import loading from "../../utils/Loading.js";

import { useSelector } from "../../store/index.js";
import { dispatch } from "../../store/index.js";
import { ShowModal } from "../../store/reducers/menu.js";
import { Login } from "../../store/reducers/auth.js";
import { APIContext } from "../../context/ApiContext.jsx";

function AuthComponent({width, height}) {

    const { getProfileInfo, login } = useContext(APIContext);

    const location = useLocation();
    const [portraitUrl, setPortraitUrl] = useState('url("/demo/assets/portrait_1.png")');
    let authClient = null;

    const {isLoggedIn} = useSelector((state) => state.auth);

    useEffect(() => {      
        if(location.pathname.includes('genres/')) {
            setPortraitUrl('url("/demo/assets/portrait_3.png")');
        } else if(location.pathname.includes('genres') || location.pathname.includes('profile')) {
            setPortraitUrl('url("/demo/assets/portrait_2.png")');    
        } else if(location.pathname.includes('home')) {
            setPortraitUrl('url("/demo/assets/portrait_1.png")'); 
        } else {
            setPortraitUrl('url("/demo/assets/portrait_1.png")'); 
        }
    });
    
    const handleLogin = async () => {
        try {          
            loading();

            const authClient = await AuthClient.create();
            const identity = authClient.getIdentity();

            alert("success", "The login successful!");
    
            let accountCanisterId = await login();

            console.log("accountCanisterId", accountCanisterId.toText());

            let profileInfo = await getProfileInfo(accountCanisterId);
            
            console.log(profileInfo[0]);

            if(!profileInfo[0]) {
                let userInfo = {
                    principal: identity.getPrincipal().toText(),
                    canisterId: accountCanisterId.toText(),
                    displaynmae: "User" + identity.getPrincipal().toText().substring(0, 4),
                    usrename: "User" + identity.getPrincipal().toText().substring(0, 4),
                    avatar: ""
                }
                    
                dispatch(Login({userInfo : userInfo}));
                alert("info", "Please create the profile");
                dispatch(ShowModal("editProfile"))
            } else {
                let userInfo = {
                    principal: identity.getPrincipal().toText(),
                    canisterId: accountCanisterId.toText(),
                    displayname: profileInfo[0].displayName,
                    usrename: profileInfo[0].userName,
                    avatar: profileInfo[0].profilePhoto[0]
                }
                    
                dispatch(Login({userInfo : userInfo}));
            }

            loading(false);
        } catch (err) {
            alert("danger", "Failure on creating canister");
            console.log("err", err.message)
            loading(false);
        }
    }
    
    const loginNFID = async() => {
        authClient = await AuthClient.create();

        if (!authClient) throw new Error("AuthClient not initialized");
        
        const APP_NAME = `${process.env.REACT_APP_SIGNIN_MESSAGE}`;
        const APP_LOGO = "https://nfid.one/icons/favicon-96x96.png";
        const CONFIG_QUERY = `?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;
        
        const identityProvider = `https://nfid.one/authenticate${CONFIG_QUERY}`;

        authClient.login({
            identityProvider,
            onSuccess: () => handleLogin(),
            windowOpenerFeatures: `
            left=${window.screen.width / 2 - 525 / 2},
            top=${window.screen.height / 2 - 705 / 2},
            toolbar=0,location=0,menubar=0,width=525,height=705
            `,
        });
    }

    const loginICP = async() => {
        authClient = await AuthClient.create();

        if (!authClient) throw new Error("AuthClient not initialized");        

        await new Promise((resolve) => {
            authClient.login({
                identityProvider: "https://identity.ic0.app",
                onSuccess: resolve,
            });
        });

        handleLogin();
    }

 return (
    <>
    {!isLoggedIn && <div className="shadow-lg rounded-4 flex flex-col justify-end items-center p-2 relative font-plus text-white" style={{
            width: width,
            height: height,
            backgroundImage: portraitUrl,
            backgroundRepeat: "no-repat",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
          }}>
        <div className="items-center flex justify-center flex-col z-30">
            <p className="text-18 font-normal leading-22 tracking-wide">Access now and</p>
            <p className="text-18 font-normal leading-22 tracking-wide">start to win</p>              
        </div>
        <div className="flex flex-row justify-center items-center z-30">
            <img className="" src="/demo/assets/ethereum.svg"/>
            <img className="" src="/demo/assets/bitcoin.svg"/>
        </div>
        <div className="flex flex-col justify-between items-center gap-8 w-full px-4 py-2 z-30">
            <a className="outline-btn text-14 px-4 py-2 font-medium rounded-8 w-full" 
                style={{border: '2px solid white', textAlign: 'center', cursor: 'pointer'}}
                onClick={(() => loginICP())}>
                
                <div className="flex justify-center items-center gap-[8px]">
                    <p>IC Identity</p>                    
                    <img className="" style={{width: "24px", height: "24px"}} src="/demo/assets/icp-logo.png"/>
                </div>
            </a>
            <a className="outline-btn text-14 px-4 py-2 font-medium rounded-8 w-full" 
                style={{border: '2px solid white', textAlign: 'center', cursor: 'pointer'}}
                onClick={(() => loginNFID())}>
                
                <div className="flex justify-center items-center gap-[8px]">
                    <p>NFID</p>     
                    <img className="rounded-md" style={{width: "24px", height: "24px"}} src="/demo/assets/nfid-logo.png"/>
                </div>
            </a>
        </div>
        <div className="absolute top-0 left-0 w-full rounded-4" style={{ height:height, background: "linear-gradient(360deg, rgba(5, 5, 5, 0.78) 26.1%, rgba(5, 5, 5, 0) 99.98%)"}}>
        </div>
    </div>}    
    </>
 )
}

export default AuthComponent;