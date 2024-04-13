import { createSlice } from '@reduxjs/toolkit';

const initialCurrency = {
    _id: '',
    icon: process.env.REACT_APP_CURRENCY_ICON,
    symbol: process.env.REACT_APP_CURRENCY,
    minBet: 1000,
    maxBet: 100000,
    price: 0.1
};

const initialUser = {
    canisterId: '',
    displayname: '',
    username: '',
    avatar: ''
};

const initialState = {
    isInitialized: true,
    isLoggedIn: false,
    code: '',
    betsId: '',
    token: '',
    balance: 0,
    balanceId: '',
    currencyId: '',
    principal: '',
    user: initialUser,
    identity: null,
    currency: initialCurrency,
    adminAddress: '',
    solAdminAddress: '',
    ethAdminAddress: '',
    balances: [],
    nowpayMinAmount: 0,
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Login(state, action) {
            const { userInfo } = action.payload;
            
            state.user = userInfo;
            state.isLoggedIn = true;
            state.isInitialized = true;
       },

        UpdateInfo(state, action) {
            state.user = action.payload;
        },

        SetIdentity(state, action) {
            const {identity} = action.payload;

            console.log("auth Identity", identity)

            state.identity = identity;
        },

        SetPrincipal(state, action) {
            const {principal} = action.payload;

            state.principal = principal;
        },

        UpdateBalance(state, action) {
            state.balance = action.payload;
        },

        UpdateBalances(state, action) {
            const balance = action.payload;
            state.balance = balance.balance;
            state.balanceId = balance._id;
            state.currency = balance.currency;
            state.currencyId = balance.currency._id;
            state = { ...state };
        },

        SetNowpayMinAmount(state, action) {
            state.nowpayMinAmount = action.payload.minAmount;
        },

        SetBalances(state, action) {
            state.balances = action.payload
        },

        SetCode(state, action) {
            state.code = action.payload;
        },

        SetBetsId(state, action) {
            state.betsId = action.payload;
        },

        Logout(state, action) {
            state.user = initialUser;
            state.isLoggedIn = false;
            state.isInitialized = true;
            state = { ...state };
            window.location.reload();
        },

        UpdateToken(state, action) {
            state.token = action.payload
        },
    }
});

export default auth.reducer;

export const { Login, Logout, SetIdentity, SetPrincipal, UpdateInfo, UpdateBalances, SetBalances, UpdateBalance, SetCode, SetBetsId, UpdateToken, SetNowpayMinAmount } = auth.actions;
