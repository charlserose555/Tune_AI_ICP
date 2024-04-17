import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../store";
import { AuthClient, LocalStorage } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import {idlFactory as ManagerIDL} from '../smart-contracts/declarations/manager/manager.did.js';
import {idlFactory as AccountIDL} from '../smart-contracts/declarations/account/account.did.js';
import { useMemo } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Logout, SetIdentity } from "../store/reducers/auth";

import { Principal } from '@dfinity/principal'; 
import { auth } from "../routes/index.js";

export const APIContext = React.createContext();

export const APIProvider = ({ children }) => {
    const {user, isLoggedIn} = useSelector((store) => store.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    const [accountCanisterId, setAccountCanisterId] = useState(''); 

    useEffect(() => {
        console.log("userCaniserID", user.canisterId)
        setAccountCanisterId(user.canisterId);
    }, [user.canisterId])

    const initAgent = async () => {
        let authClient, identity, agent;

        authClient = await AuthClient.create();
        if(authClient.isAuthenticated) {
            identity = authClient.getIdentity();
    
            agent = new HttpAgent({ identity, host : process.env.REACT_APP_PUBLIC_HOST});  
    
            if(process.env.REACT_APP_DFX_NETWORK != "ic") {
                agent.fetchRootKey();
            }

            return {identity: identity, agent: agent}
        } else {
            agent = null;
            history.push("/");
            dispatch(Logout({}))

            return null;
        }
    }

    const login = async () => {
        let {agent, identity} = await initAgent();
        
        if (agent == null) 
            return null;

        let accountData = {
            createdAt: Number(Date.now() * 1000),
            userPrincipal: identity.getPrincipal(),            
        }

        let managerActor = Actor.createActor(ManagerIDL, {
            agent,
            canisterId: process.env.REACT_APP_MANAGER_CANISTER_ID
        });
    
        let bucket = await managerActor.createAccountCanister(accountData);        
        
        console.log("bucket", bucket[0]);

        return bucket[0];
    };

    const getProfileInfo = async (accountCanisterId) => {
        let {agent, identity} = await initAgent();
        
        if (agent == null) 
            return null;

        if(process.env.REACT_APP_DFX_NETWORK != "ic") {
            agent.fetchRootKey();
        }

        let accountActor = Actor.createActor(AccountIDL, {
            agent,
            canisterId: accountCanisterId.toText()
        });

        let profileInfo = await accountActor.getProfileInfo(identity.getPrincipal());

        return profileInfo;
    }

    const createProfile = async (profileInfo) => {   
        let {agent} = await initAgent();
        
        if (agent == null) 
            return null;
        
        console.log("user.canisterId", accountCanisterId);

        let accountActor = Actor.createActor(AccountIDL, {
            agent,
            canisterId: accountCanisterId
        });
        
        console.log("profileInfo", profileInfo)

        let result = await accountActor.updateProfileInfo(profileInfo);

        return result;
    }
    
    // const value = useMemo(
    //     () => ({
    //         getProfileInfo,
    //         createProfile,
    //         login,
    //     }),
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     []
    //   );

    return (
        <APIContext.Provider
            value={{
                getProfileInfo,
                createProfile,
                login
            }}
        >
            {children}
        </APIContext.Provider>
    );
};


