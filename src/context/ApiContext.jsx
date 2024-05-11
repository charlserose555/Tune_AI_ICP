import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../store";
import { AuthClient, LocalStorage } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import {idlFactory as ManagerIDL} from '../smart-contracts/declarations/manager/manager.did.js';
import {idlFactory as AccountIDL} from '../smart-contracts/declarations/account/account.did.js';
import {idlFactory as ContentIDL} from '../smart-contracts/declarations/content/content.did.js';
import {idlFactory as ContentManagerIDL} from '../smart-contracts/declarations/contentManager/contentManager.did.js';
import axios from "../utils/Axios"
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom';

import { Logout, SetIdentity } from "../store/reducers/auth";

import { Principal } from '@dfinity/principal'; 
import { encodeArrayBuffer} from '../utils/format.js';

export const APIContext = React.createContext();

export const APIProvider = ({ children }) => {
    const MAX_CHUNK_SIZE = 1024 * 500; // 500kb
    const {user, isLoggedIn} = useSelector((store) => store.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    const [principal, setPrincipal] = useState(''); 
    // const [isSessionExpired, setIsSessionExpired] = useState(false);

    useEffect(() => {        
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
    
            agent = new HttpAgent({ identity, 
                host : process.env.REACT_APP_DFX_NETWORK != "ic" ? process.env.REACT_APP_PUBLIC_HOST : process.env.REACT_APP_PUBLIC_HOST_IC});  
    
            if(process.env.REACT_APP_DFX_NETWORK != "ic") {
                await agent.fetchRootKey();
            }

            console.log("principal", principal)

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

    const getProfileInfo = async (userPrincipal = null) => {
        // let {agent, identity} = await initAgent(true);
        
        // if (agent == null) 
        //     return null;

        // if(process.env.REACT_APP_DFX_NETWORK != "ic") {
        //     agent.fetchRootKey();
        // }

        // let accountActor = Actor.createActor(AccountIDL, {
        //     agent,
        //     canisterId: process.env.REACT_APP_DFX_NETWORK != "ic"? process.env.REACT_APP_MANAGER_CANISTER_ID : process.env.REACT_APP_IC_MANAGER_CANISTER_ID
        // });

        // let profileInfo = await accountActor.getProfileInfo(userPrincipal ? userPrincipal : identity.getPrincipal());

        let profileInfo;

        return profileInfo;
    }

    const signIn = async (userPrincipal = null) => {
        const result = await axios.post("api/v/users/signin", {userPrincipal : userPrincipal});

        return result;
    }

    const uploadProfile = async (profileInfo, userInfo) => {   
        let { agent } = await initAgent();
        
        if (agent == null) 
            return null;
        
        let accountActor = Actor.createActor(AccountIDL, {
            agent,
            canisterId: process.env.REACT_APP_DFX_NETWORK != "ic"? process.env.REACT_APP_MANAGER_CANISTER_ID : process.env.REACT_APP_IC_MANAGER_CANISTER_ID
        });
        
        console.log("profileInfo", userInfo);

        let result = await Promise.all([accountActor.editProfileInfo(profileInfo), 
            axios.post("api/v/users/uploadProfile", {
            ...userInfo})
        ]);

        console.log(result);

        return result;
    }
    
    const createContentInfo = async (contentInfo) => {
        let {agent} = await initAgent();
        
        if (agent == null) 
            return null;

        let contentManagerActor = Actor.createActor(ContentManagerIDL, {
            agent,
            canisterId: process.env.REACT_APP_DFX_NETWORK != "ic"? process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID : process.env.REACT_APP_IC_CONTENT_MANAGER_CANISTER_ID
        });

        let result = await contentManagerActor.createContent(contentInfo);

        return result;
    }

    const uploadTrackInfo = async (trackInfo) => {
        
    }

    // const upgradeContentCanister = async (contentInfo) => {
    //     let {agent} = await initAgent();
        
    //     if (agent == null) 
    //         return null;

    //     let contentManagerActor = Actor.createActor(ContentManagerIDL, {
    //         agent,
    //         canisterId: process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID
    //     });

    //     let result = await contentManagerActor.createContent(contentInfo);

    //     return result;
    // }

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
            canisterId: process.env.REACT_APP_DFX_NETWORK != "ic"? process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID : process.env.REACT_APP_IC_CONTENT_MANAGER_CANISTER_ID
        });

        let result = await contentManagerActor.getAllContentInfoByUserId(Principal.fromText(user.principal));

        console.log("result", result)

        return result;
    }

    const getAllReleasedTracks = async () => {

        const authClient = await AuthClient.create();        
        
        const identity = authClient.getIdentity();
        
        const agent = new HttpAgent({ identity, 
            host : process.env.REACT_APP_DFX_NETWORK != "ic" ? process.env.REACT_APP_PUBLIC_HOST : process.env.REACT_APP_PUBLIC_HOST_IC});

        if(process.env.REACT_APP_DFX_NETWORK != "ic") {
            await agent.fetchRootKey();
        }

        if (agent == null) 
            return null;

        let contentManagerActor = Actor.createActor(ContentManagerIDL, {
            agent,
            canisterId: process.env.REACT_APP_DFX_NETWORK != "ic"? process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID : process.env.REACT_APP_IC_CONTENT_MANAGER_CANISTER_ID
        });

        let result = await contentManagerActor.getAllContentInfo(true);

        return result;           

    }

    const increasePlayCount = async (contentId) => {
        const authClient = await AuthClient.create();        
        
        const identity = authClient.getIdentity();
        
        const agent = new HttpAgent({ identity, 
            host : process.env.REACT_APP_DFX_NETWORK != "ic" ? process.env.REACT_APP_PUBLIC_HOST : process.env.REACT_APP_PUBLIC_HOST_IC});
            
        if(process.env.REACT_APP_DFX_NETWORK != "ic") {
            await agent.fetchRootKey();
        }
        
        let contentManagerActor = Actor.createActor(ContentManagerIDL, {
            agent,
            canisterId: process.env.REACT_APP_DFX_NETWORK != "ic"? process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID : process.env.REACT_APP_IC_CONTENT_MANAGER_CANISTER_ID
        });

        let result = await contentManagerActor.increasePlayCount(contentId);

        return result;
    }

    const releaseTrackItem = async (contentId, release = true) => {
        const authClient = await AuthClient.create();        
        
        const identity = authClient.getIdentity();
        
        const agent = new HttpAgent({ identity, 
            host : process.env.REACT_APP_DFX_NETWORK != "ic" ? process.env.REACT_APP_PUBLIC_HOST : process.env.REACT_APP_PUBLIC_HOST_IC
        });
            
        if(process.env.REACT_APP_DFX_NETWORK != "ic") {
            await agent.fetchRootKey();
        }
        
        let contentManagerActor = Actor.createActor(ContentManagerIDL, {
            agent,
            canisterId: process.env.REACT_APP_DFX_NETWORK != "ic"? process.env.REACT_APP_CONTENT_MANAGER_CANISTER_ID : process.env.REACT_APP_IC_CONTENT_MANAGER_CANISTER_ID
        });

        let result = await contentManagerActor.releaseTrack(contentId, release);

        return result;
    }

    const checkDisplayName = async (displayname, userPrincipal) => {
        const data = await axios.post("api/v/users/checkDisplayName", {
            displayname : displayname,
            userPrincipal : userPrincipal
        });

        return data;
    }
    
    const uploadFile = async (data) => {
        const res = await axios.post("api/v/files/", data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return res;
    };

    // const register = async (
    //     userPincipal,
    //     displayName,
    //     userName, 
    // ) => {
    //     const data = await axios.post("api/v/users/signup", {
    //         rReferral: code,
    //         email,
    //         username,
    //         password,
    //     });
    //     return data;
    // };

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
                signIn,
                getProfileInfo,
                uploadProfile,
                createContentInfo,
                getSongListByIdentity,
                getAllReleasedTracks,
                processAndUploadChunk,
                increasePlayCount,
                releaseTrackItem,
                checkDisplayName,
                uploadFile
            }}
        >
            {children}
        </APIContext.Provider>
    );
};


