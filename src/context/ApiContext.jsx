import React, { createContext } from "react";
import { Logout } from "../store/reducers/auth";
import { useDispatch, useSelector } from "../store";
import axios from "../utils/Axios"
import { saveBets, savePools } from "../store/reducers/p2p";
const APIContext = createContext(null);

export const APIProvider = ({ children }) => {
    const dispatch = useDispatch();
    const state = useSelector((store) => store.auth);
    const { user, currencyId, balanceId, code } = state;
    const userId = user?._id;
    const userName = user?.username;

    const login = async (email, password) => {
        const data = await axios.post("api/v2/users/signin", {
            email,
            password,
        });
        return data;
    };

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
