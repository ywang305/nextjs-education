import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { combineReducers } from 'redux';
import deviceReducer from './device/reducer';

/*
// this is for top level
const rootPersistConfig = {
	key: 'root',
	storage: storage,
	blacklist: [], // whitelist:[]
};
*/
const devicePersistConfig = {
    key: 'device',
    storage: storage,
    whitelist: ['speech'],
};

export default combineReducers({
    device: persistReducer(devicePersistConfig, deviceReducer),
    // login: persistReducer(loginTokenPersistConfig, loginReducer),
    // profile: persistReducer(profileInfoPersistConfig, profileReducer),
    // payment: paymentReducer,
    // notification: notificationReducer,
});
