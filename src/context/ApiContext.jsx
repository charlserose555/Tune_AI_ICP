import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../store";
import { AuthClient, LocalStorage } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import {idlFactory as ManagerIDL} from '../smart-contracts/declarations/manager/manager.did.js';
import {idlFactory as AccountIDL} from '../smart-contracts/declarations/account/account.did.js';
import {idlFactory as ContentIDL} from '../smart-contracts/declarations/content/content.did.js';
import {idlFactory as ContentManagerIDL} from '../smart-contracts/declarations/contentManager/contentManager.did.js';
import { useMemo } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Logout, SetIdentity } from "../store/reducers/auth";

import { Principal } from '@dfinity/principal'; 
import { auth } from "../routes/index.js";
import { encodeArrayBuffer} from '../utils/format.js';

export const APIContext = React.createContext();

export const APIProvider = ({ children }) => {
    const MAX_CHUNK_SIZE = 1024 * 500; // 500kb
    const {user, isLoggedIn} = useSelector((store) => store.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    const [accountCanisterId, setAccountCanisterId] = useState(''); 


    useEffect(() => {
        console.log("userCaniserID", user.canisterId)
        setAccountCanisterId(user.canisterId);
    }, [user.canisterId])

    const logout = () => {
        history.push("/");
        dispatch(Logout({}))
    }

    const initAgent = async () => {
        let authClient, identity, agent;

        authClient = await AuthClient.create();
        if(authClient.isAuthenticated) {
            identity = authClient.getIdentity();
    
            agent = new HttpAgent({ identity, host : process.env.REACT_APP_PUBLIC_HOST});  
    
            if(process.env.REACT_APP_DFX_NETWORK != "ic") {
                agent.fetchRootKey();
            }

            console.log("identity", identity.getPrincipal().toText())

            return {identity: identity, agent: agent}
        } else {
            return {agent: null};
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

    const editProfile = async (profileInfo) => {   
        let {agent} = await initAgent();
        
        if (agent == null) 
            return null;
        
        console.log("user.canisterId", accountCanisterId);

        let accountActor = Actor.createActor(AccountIDL, {
            agent,
            canisterId: accountCanisterId
        });
        
        console.log("profileInfo", profileInfo)

        let result = await accountActor.editProfileInfo(profileInfo);

        return result;
    }
    
    const createContentInfo = async (contentInfo) => {
        let {agent} = await initAgent();
        
        if (agent == null) 
            return null;

        let accountActor = Actor.createActor(AccountIDL, {
            agent,
            canisterId: accountCanisterId
        });

        let result = await accountActor.createContent(contentInfo);

        return result;
    }

    const processAndUploadChunk = async (
        blob,
        byteStart,
        contentId,
        contentCanisterId,
        chunk,
        fileSize,
    )  => {
        let {agent} = await initAgent();
        
        if (agent == null) 
            return null;

        const blobSlice = blob.slice(
            byteStart,
            Math.min(Number(fileSize), byteStart + MAX_CHUNK_SIZE),
            blob.type
        );
        const bsf = await blobSlice.arrayBuffer();
    
        let contentActor = Actor.createActor(ContentIDL, {
            agent,
            canisterId: contentCanisterId
        });

        return contentActor.putContentChunk(contentId, chunk, encodeArrayBuffer(bsf));
    }

    const getSongListByIdentity = async () => {
        let {agent} = await initAgent();
        
        if (agent == null) 
            return null;

        let contentManagerActor = Actor.createActor(ContentManagerIDL, {
            agent,
            canisterId: process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID
        });

        let result = await contentManagerActor.getAllContentInfoByUserId(Principal.fromText(user.principal));

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
                login,
                getProfileInfo,
                editProfile,
                createContentInfo,
                getSongListByIdentity,
                processAndUploadChunk
            }}
        >
            {children}
        </APIContext.Provider>
    );
};


