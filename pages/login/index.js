import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';

import { useTheme } from '@material-ui/core/styles';
import { TextField, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { loginThunk } from '../../lib/store/login/action';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import AlertSnackbar from '../components/AlertSnackbar';

const useLogin = () => {
    // alert
    const [error, setError] = useState('');

    // -- login

    const [credential, setCredential] = useState({ userId: '', password: '' });

    const changeHandler = e => {
        const { name, value } = e.target;
        setCredential(c => ({ ...c, [name]: value }));
    };
    const dispatch = useDispatch();
    const clickToLogin = async () => {
        const { userId, password } = credential;

        if (password.length > 0 && userId.length > 0) {
            const user = await dispatch(loginThunk(userId, password));
            if (user?.userId) {
                Router.replace('/');
            } else if (user?.error) {
                setError(user.error);
            }
        }
    };

    return [credential, changeHandler, clickToLogin, error, setError];
};

const LoginPage = () => {
    const [
        credential,
        changeHandler,
        clickToLogin,
        error,
        setError,
    ] = useLogin();
    const { userId, password } = credential;

    const theme = useTheme();
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
                        name='password'
                        label='Password'
                        fullWidth
                        margin='normal'
                        value={password}
                    />
                    <Box py={2}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={clickToLogin}
                        >
                            Login
                        </Button>
                    </Box>

                    <Link href='/login/signup'>New User ?</Link>
                </form>
            </Box>
            <AlertSnackbar
                message={error}
                setMessage={setError}
                severity='error'
            />
        </Box>
    );
};

export default LoginPage;
