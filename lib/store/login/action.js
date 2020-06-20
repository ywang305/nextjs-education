import fetchAsync from '../../fetchAsync';
import TYPE from './action_type';

export const setLoginUserIdCreator = (userId, password) => ({
    type: TYPE.SET_LOGIN_USER,
    userId,
    password,
});

export function loginThunk(userId, password) {
    return async dispatch => {
        const url = '/api/login';
        const user = await fetchAsync(url, {
            method: 'POST',
            body: { userId, password },
        });
        dispatch(setLoginUserIdCreator(user?.userId, user?.password));
        return user;
    };
}

export function signupThunk(userId, password) {
    return async dispatch => {
        const url = '/api/login/signup';
        const user = await fetchAsync(url, {
            method: 'POST',
            body: { userId, password },
        });
        dispatch(setLoginUserIdCreator(user?.userId, user?.password));
        return user;
    };
}
