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
    _id: '',
    email: '',
    username: '',
    iReferral: '',
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
    user: initialUser,
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
            const { balance, user, session, adminAddress, solAdminAddress, ethAdminAddress } = action.payload;
            state.user = user;
            state.token = session.accessToken;
            state.balance = balance.balance;
            state.balanceId = balance._id;
            state.currency = balance.currency;
            state.currencyId = balance.currency._id;
            state.isLoggedIn = true;
            state.isInitialized = true;
            state.adminAddress = adminAddress;
            state.solAdminAddress = solAdminAddress;
            state.ethAdminAddress = ethAdminAddress;
        },

        UpdateInfo(state, action) {
            state.user = action.payload;
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
            console.log(state, "state")
            state.token = '';
            state.balance = 0;
            state.balanceId = '';
            state.currencyId = '';
            state.user = initialUser;
            state.currency = initialCurrency;
            state.isLoggedIn = false;
            state.isInitialized = true;
            state = { ...state };
            if (
                window.location.pathname.toString().indexOf('blackjack') !== -1 ||
                window.location.pathname.toString().indexOf('roulette') !== -1 || 
                window.location.pathname.toString().indexOf('/sports') !== -1
            ) {
                window.location.reload();
            }
        },

        UpdateToken(state, action) {
            state.token = action.payload
        },
    }
});

export default auth.reducer;

export const { Login, Logout, UpdateInfo, UpdateBalances, SetBalances, UpdateBalance, SetCode, SetBetsId, UpdateToken, SetNowpayMinAmount } = auth.actions;
