import { combineReducers } from 'redux';

import authReducer from './auth';
import menuReducer from './menu';
import sportsReducer from './sports';
import p2pReducer from './p2p';
import snackbarReducer from './snackbar';

const reducer = combineReducers({
    auth: authReducer,
    menu: menuReducer,
    sports: sportsReducer,
    p2p: p2pReducer,
    snackbar: snackbarReducer
});

export default reducer;
