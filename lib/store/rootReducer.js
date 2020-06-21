import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { combineReducers } from 'redux';
import deviceReducer from './device/reducer';
import noteReducer from './note/reducer';
import loginReducer from './login/reducer';

/*
// this is for top level
const rootPersistConfig = {
	key: 'root',
	storage: storage,
	blacklist: [], // whitelist:[]
};
*/

const notePersistConfig = {
    key: 'note',
    storage,
    whitelist: ['speech'],
};
const loginPersistConfig = {
    key: 'login',
    storage,
    whitelist: ['userId'],
};

export default combineReducers({
    device: deviceReducer,
    note: persistReducer(notePersistConfig, noteReducer),
    login: persistReducer(loginPersistConfig, loginReducer),
    // profile: persistReducer(profileInfoPersistConfig, profileReducer),
    // payment: paymentReducer,
    // notification: notificationReducer,
});
