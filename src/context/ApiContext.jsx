import React, { createContext, useEffect, useState } from "react";
import { Logout } from "../store/reducers/auth";
import { useDispatch, useSelector } from "../store";
import axios from "../utils/Axios"
import { saveBets, savePools } from "../store/reducers/p2p";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import {idlFactory as ManagerIDL} from '../smart-contracts/declarations/manager/manager.did.js';
import {idlFactory as AccountIDL} from '../smart-contracts/declarations/account/account.did.js';

import { Principal } from '@dfinity/principal'; 
import { setId } from "@material-tailwind/react/components/Tabs/TabsContext.js";

const APIContext = createContext(null);

export const APIProvider = ({ children }) => {
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);
    const { user, currencyId, balanceId, code} = auth;
    const userId = user?._id;
    const userName = user?.username;
    const [identity, setIdentity] = useState(null);
    const [principal, setPrincipal] = useState('');

    useEffect(() => {
        setIdentity(auth.identity)
        setPrincipal(auth.principal)
    }, [auth])

    const login = async () => {

        const agent = new HttpAgent({ identity, host : process.env.REACT_APP_PUBLIC_HOST});

        console.log("principal", principal);

        if(process.env.REACT_APP_DFX_NETWORK != "ic") {
            agent.fetchRootKey();
        }

        let accountData = {
            createdAt: Number(Date.now() * 1000),
            userPrincipal: principal.toText(),            
        }

        console.log(accountData);

        let managerActor = Actor.createActor(ManagerIDL, {
            agent,
            canisterId: process.env.REACT_APP_MANAGER_CANISTER_ID
        });
    
        let bucket = await managerActor.createProfileArtist(accountData);        
        
        return bucket[0].toText();
    };

    const getProfileInfo = async (accountCanisterId) => {
        const agent = new HttpAgent({ identity, host : process.env.REACT_APP_PUBLIC_HOST});

        let accountActor = Actor.createActor(AccountIDL, {
            agent,
            canisterId: accountCanisterId
        });

        let profileInfo = await accountActor.getProfileInfo(principal);

        return profileInfo;
    }

    const createProfile = async (profileInfo) => {
        const agent = new HttpAgent({ identity, host : process.env.REACT_APP_PUBLIC_HOST});

        let accountActor = Actor.createActor(AccountIDL, {
            agent,
            canisterId: user.canisterId
        });

        let result = await accountActor.createProfileInfo(profileInfo);
    }

    const register = async (
        email,
        username,
        password
    ) => {
        const data = await axios.post("api/v2/users/signup", {
            rReferral: code,
            email,
            username,
            password,
        });
        return data;
    };

    const signUpAddress = async (publicAddress, defaultCurrency) => {
        const res = await axios.post("api/v2/users/a-signup", {
            rReferral: code,
            publicAddress,
            defaultCurrency
        });
        return res;
    };

    const updateUserInfo = async (info) => {
        const res = await axios.post("api/v2/users/info", { ...info, userId });
        return res;
    };

    const logout = () => {
        dispatch(Logout({}));
    };

    const getPaymentCurrencyInfo = async(currency) => {
        const res = await axios.post("api/v2/payments/get-payment-currency-info", {
            currency
        });

        return res;
    }
 
    const createNowpayments = async (currencyId, currency, amount) => {
        console.log(amount);

        const res = await axios.post("api/v2/payments/create-nowpay", {
            userId,
            currency,
            currencyId,
            amount
        });
        return res;
    };

    const getBalances = async () => {
        const res = await axios.post("api/v2/payments/get-balance", { userId });
        return res;
    };

    //currency
    const changeCurrency = async (currency) => {
        const res = await axios.post("api/v2/payments/use-currency", {
            userId,
            currency,
        });
        return res;
    };

    const addCurrency = async (currency) => {
        const res = await axios.post("api/v2/payments/add-currency", {
            userId,
            currency,
        });
        return res;
    };

    const depositMetamask = async (transaction) => {
        const res = await axios.post("api/v2/payments/m-deposit", {
          userId,
          balanceId,
          currencyId,
          ...transaction,
        });
        return res;
      };
    
    const depositSolana = async (transaction) => {
        const res = await axios.post('api/v2/payments/s-deposit', {
            userId,
            balanceId,
            currencyId,
            ...transaction
        });
        return res;
    };

    const withdrawal = async (
        address,
        method,
        amount
    ) => {
        const res = await axios.post("api/v2/payments/withdrawal", {
            userId,
            currencyId,
            balanceId,
            address,
            method,
            amount,
        });
        return res;
    };

    //P2P betting
    const createPool = async (data) => {
        const res = await axios.post("api/v2/p2p/create-pool", {
            ...data,
            ownerId: userId,
        });
        return res;
    };

    const joinPool = async (stake, type, poolId) => {
        const res = await axios.post("api/v2/p2p/join-pool", {
            stake,
            type,
            userId,
            poolId,
            currencyId
        });
        return res;
    };

    const openGame = async (slug, userId) => {
        const res = await axios.post("api/v2/casinos/opengame", {
            slug: slug,
            userId: userId
        });
        return res;
    }

    const openDemoGame = async (slug) => {
        const res = await axios.post("api/v2/casinos/demogame", { slug });
        return res;
    }

    const getPools = async () => {
        const res = await axios.get('api/v2/p2p/get-pools');
        dispatch(savePools(res.data.data))
        return res.data;
    }


    const cancelWithdrawal = async (_id) => {
        const res = await axios.post("api/v2/payments/c-withdrawal", {
          userId,
          _id,
        });
        return res;
    };
    
    return (
        <APIContext.Provider
            value={{
                login,
                getProfileInfo,
                createProfile,
                register,
                signUpAddress,
                updateUserInfo,
                logout,
                createNowpayments,
                getPaymentCurrencyInfo,
                getBalances,
                changeCurrency,
                addCurrency,
                withdrawal,
                createPool,
                getPools,
                joinPool,
                openGame,
                openDemoGame,
                cancelWithdrawal,
                depositMetamask,
                depositSolana
            }}
        >
            {children}
        </APIContext.Provider>
    );
};

export default APIContext;
