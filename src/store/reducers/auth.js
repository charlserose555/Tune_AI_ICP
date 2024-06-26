import { createSlice } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import _ from "lodash";

const initialCurrency = {
    _id: '',
    icon: process.env.REACT_APP_CURRENCY_ICON,
    symbol: process.env.REACT_APP_CURRENCY,
    minBet: 1000,
    maxBet: 100000,
    price: 0.1
};

const initialUser = {
    principal: '',
    displayname: '',
    username: '',
    role : '',
    avatar: '',
    fileType: 'jpeg',
    createdAt: 0,
    isInitialized: false,
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
    principal: null,
    user: initialUser,
    identity: '',
    songListUpdated : 0,
    currency: initialCurrency,
    adminAddress: '',
    nowpayMinAmount: 0,
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Login(state, action) {
            const { userInfo } = action.payload;
            state.isLoggedIn = true;
            state.isInitialized = true;    
            state.user = userInfo;
       },

        UpdateInfo(state, action) {
            const {userInfo} = action.payload;

            state.user = _.merge({}, state.user, userInfo);
        },

        SetIdentity(state, action) {
            const {identity} = action.payload;

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
        },

        UpdateToken(state, action) {
            state.token = action.payload
        },

        UpdateSongList(state, action) {
            state.songListUpdated = state.songListUpdated + 1;
        }
    }
});

export default auth.reducer;

export const { Login, Logout, SetIdentity, UpdateSongList, SetPrincipal, UpdateInfo, UpdateBalances, SetBalances, UpdateBalance, SetCode, SetBetsId, UpdateToken, SetNowpayMinAmount } = auth.actions;
