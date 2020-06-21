import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '@material-ui/core/styles';
import { Box, TextField, Button, Typography } from '@material-ui/core';
import { signupThunk } from '../../lib/store/login/action';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { clrLoginUserCreator } from '../../lib/store/login/action';

export const useProfile = () => {
    const userId = useSelector(st => st.login.userId);
    const isSuperId = userId === 'super99';
    return [userId, isSuperId];
};

const useLogout = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(clrLoginUserCreator());
        Router.replace('/');
    };
    return [logoutHandler];
};

const ProfilePage = () => {
    const theme = useTheme();

    const [userId, isSuperId] = useProfile();
    const [logoutHandler] = useLogout();

    return (
        <Box display='flex' justifyContent='center' pt={theme.spacing(1)}>
            <Box maxWidth={400}>
                <Typography gutterBottom>{`UserId:  ${userId}`}</Typography>
                <Typography gutterBottom>
                    {isSuperId ? 'Role: administrator.' : 'Role: regular user.'}
                </Typography>
                <Button
                    color='primary'
                    variant='outlined'
                    startIcon={<ExitToAppIcon />}
                    onClick={logoutHandler}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default ProfilePage;
