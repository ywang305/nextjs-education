import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';

import { useTheme } from '@material-ui/core/styles';
import { TextField, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { loginThunk } from '../../lib/store/login/action';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

const useLogin = () => {
    // alert
    const [error, setError] = useState('');

    const onAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError('');
    };

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

    return [credential, changeHandler, clickToLogin, error, onAlertClose];
};

const LoginPage = () => {
    const [
        credential,
        changeHandler,
        clickToLogin,
        error,
        onAlertClose,
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
            <Snackbar
                open={Boolean(error)}
                autoHideDuration={6000}
                onClose={onAlertClose}
            >
                <Alert
                    onClose={onAlertClose}
                    severity='error'
                    elevation={6}
                    variant='filled'
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginPage;
