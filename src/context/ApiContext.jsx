import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../store";
import { AuthClient, LocalStorage } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import {idlFactory as ManagerIDL} from '../smart-contracts/declarations/manager/manager.did.js';
import {idlFactory as AccountIDL} from '../smart-contracts/declarations/account/account.did.js';
import {idlFactory as ContentIDL} from '../smart-contracts/declarations/content/content.did.js';
import {idlFactory as ContentManagerIDL} from '../smart-contracts/declarations/contentManager/contentManager.did.js';
import { useMemo } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom';

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
    const [principal, setPrincipal] = useState(''); 
    // const [isSessionExpired, setIsSessionExpired] = useState(false);

    useEffect(() => {
        console.log("userCaniserID", user.canisterId)
        setAccountCanisterId(user.canisterId);
        setPrincipal(user.principal);
    }, [user.principal])

    const logout = () => {
        // console.log("history", history)

        // history.push("/");
        dispatch(Logout({}))
    }

    const initAgent = async (init = false) => {
        let authClient, identity, agent;

        authClient = await AuthClient.create();
        let isSessionExpired = false
        if(authClient.isAuthenticated) {
            identity = authClient.getIdentity();
    
            agent = new HttpAgent({ identity, host : process.env.REACT_APP_PUBLIC_HOST});  
    
            if(process.env.REACT_APP_DFX_NETWORK != "ic") {
                await agent.fetchRootKey();
            }

            if(!init && principal != identity.getPrincipal().toText()) {
                isSessionExpired = true;

                console.log("session", identity.getPrincipal().toText())
                console.log("sessionExpired~~~~~~~", isSessionExpired)

                logout();

                return {agent: null};
            }

            return {identity: identity, agent: agent, isSessionExpired: isSessionExpired}
        } else {
            return {agent: null};
        }
    }

    const login = async () => {
        let {agent, identity} = await initAgent(true);
        
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

    const getProfileInfo = async (accountCanisterId, userPrincipal = null) => {
        let {agent, identity} = await initAgent(true);
        
        if (agent == null) 
            return null;

        if(process.env.REACT_APP_DFX_NETWORK != "ic") {
            agent.fetchRootKey();
        }

        let accountActor = Actor.createActor(AccountIDL, {
            agent,
            canisterId: accountCanisterId.toText()
        });

        let profileInfo = await accountActor.getProfileInfo(userPrincipal ? userPrincipal : identity.getPrincipal());

        return profileInfo;
    }

    const editProfile = async (profileInfo) => {   
        let { agent } = await initAgent();
        
        if (agent == null) 
            return null;
        
        console.log("user.canisterId", accountCanisterId);

        let accountActor = Actor.createActor(AccountIDL, {
            agent,
            canisterId: accountCanisterId
        });
        
        profileInfo.accountCanisterId = accountCanisterId;

        console.log("profileInfo", profileInfo)

        let result = await accountActor.editProfileInfo(profileInfo);

        return result;
    }
    
    const createContentInfo = async (contentInfo) => {
        let {agent} = await initAgent();
        
        if (agent == null) 
            return null;

        let contentManagerActor = Actor.createActor(ContentManagerIDL, {
            agent,
            canisterId: process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID
        });

        let result = await contentManagerActor.createContent(contentInfo);

        return result;
    }

    // const processAndUploadChunk = async (
    //     blob,
    //     byteStart,
    //     contentId,
    //     contentCanisterId,
    //     chunk,
    //     fileSize,
    // )  => {
    //     const t0 = performance.now();

    //     let {agent, isSessionExpired} = await initAgent();
        
    //     if (agent == null) 
    //         return null;

    //     if (isSessionExpired) 
    //         return null;

    //     const blobSlice = blob.slice(
    //         byteStart,
    //         Math.min(Number(fileSize), byteStart + MAX_CHUNK_SIZE),
    //         blob.type
    //     );
    //     const bsf = await blobSlice.arrayBuffer();
    
    //     let contentActor = Actor.createActor(ContentIDL, {
    //         agent,
    //         canisterId: contentCanisterId
    //     });

    //     let result = await contentActor.putContentChunk(contentId, chunk, encodeArrayBuffer(bsf));

    //     const t1 = performance.now();
    //     console.log("Upload took " + (t1 - t0) / 1000 + " seconds.")

    //     return result;
    // }

    const processAndUploadChunk = async (
        audioInfo, contentCanisterId, contentId
    )  => {
        const t0 = performance.now();

        let { agent } = await initAgent();
        
        if (agent == null) 
            return null;

        let putChunkPromises = [];

        let contentActor = Actor.createActor(ContentIDL, {
            agent,
            canisterId: contentCanisterId
        });

        let chunk = 1;
        for (let byteStart = 0; byteStart < audioInfo.size; byteStart += MAX_CHUNK_SIZE, chunk++ ) {
            putChunkPromises.push(
                putContentChunk(audioInfo.data, byteStart, contentId, contentCanisterId, chunk, audioInfo.size, contentActor)
            );
        }

        let result = await Promise.all(putChunkPromises)

        console.log("result", result)

        const t1 = performance.now();
        console.log("Upload took " + (t1 - t0) / 1000 + " seconds.")

        return null;
    }

    const putContentChunk = async (blob,
        byteStart,
        contentId,
        contentCanisterId,
        chunk,
        fileSize, 
        contentActor) => {

        const t0 = performance.now();

        const blobSlice = blob.slice(
            byteStart,
            Math.min(Number(fileSize), byteStart + MAX_CHUNK_SIZE),
            blob.type
        );
        const bsf = await blobSlice.arrayBuffer();

        let result = await contentActor.putContentChunk(contentId, chunk, encodeArrayBuffer(bsf));

        const t1 = performance.now();
        console.log("Upload one took " + (t1 - t0) / 1000 + " seconds.")

        return result;        
    }

    const getSongListByIdentity = async () => {
        let { agent } = await initAgent();
        
        if (agent == null) 
            return null;

        let contentManagerActor = Actor.createActor(ContentManagerIDL, {
            agent,
            canisterId: process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID
        });

        let result = await contentManagerActor.getAllContentInfoByUserId(Principal.fromText(user.principal));

        return result;
    }

    const increasePlayCount = async (contentId) => {
        let {agent, isSessionExpired} = await initAgent();
        
        if (agent == null) 
            return null;

        let contentManagerActor = Actor.createActor(ContentManagerIDL, {
            agent,
            canisterId: process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID
        });

        let result = await contentManagerActor.increasePlayCount(contentId);

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
                processAndUploadChunk,
                increasePlayCount
            }}
        >
            {children}
        </APIContext.Provider>
    );
};


