import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '@material-ui/core/styles';
import { Box, TextField, Button } from '@material-ui/core';
import { signupThunk } from '../../lib/store/login/action';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import AlertSnackbar from '../components/AlertSnackbar';

const useSignup = () => {
    const [msg, setMsg] = useState('');

    const [credential, setCredential] = useState({
        userId: '',
        password: '',
        repeatpassword: '',
    });

    const changeHandler = e => {
        const { name, value } = e.target;
        setCredential(c => ({ ...c, [name]: value }));
    };
    const dispatch = useDispatch();
    const clickToLogin = async () => {
        const { userId, password, repeatpassword } = credential;
        if (
            password === repeatpassword &&
            password.length > 0 &&
            userId.length > 0
        ) {
            const user = await dispatch(signupThunk(userId, password));
            if (user?.error) {
                setMsg(user.error);
            } else if (user?.userId) {
                Router.replace('/');
            }
        }
    };

    return [credential, changeHandler, clickToLogin, msg, setMsg];
};

const SignupPage = () => {
    const theme = useTheme();

    const [credential, changeHandler, clickToLogin, msg, setMsg] = useSignup();
    const { userId, password, repeatpassword } = credential;

    const repeatError = !password.startsWith(repeatpassword);

    return (
        <Box display='flex' justifyContent='center' pt={theme.spacing(1)}>
            <Box maxWidth={400}>
                <form onChange={changeHandler}>
                    <TextField
                        label='User Name'
                        name='userId'
                        fullWidth
                        margin='normal'
                        value={userId}
                    />
                    <TextField
                        type='password'
                        label='Password'
                        name='password'
                        fullWidth
                        margin='normal'
                        value={password}
                    />
                    <TextField
                        error={repeatError}
                        helperText={repeatError && 'Password not matched'}
                        type='password'
                        label='Repeat Password'
                        name='repeatpassword'
                        fullWidth
                        margin='normal'
                        value={repeatpassword}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={clickToLogin}
                    >
                        Register
                    </Button>
                </form>
            </Box>
            <AlertSnackbar message={msg} setMessage={setMsg} severity='error' />
        </Box>
    );
};

export default SignupPage;
