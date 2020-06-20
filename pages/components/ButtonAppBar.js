import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Divider, useTheme } from '@material-ui/core';

const links = ['note', 'spell', 'login'];

const useUserId = () => {
    const userId = useSelector(state => state.login.userId);
    return [userId];
};

export function ButtonAppBar() {
    const theme = useTheme();

    const [userId] = useUserId();
    return (
        <AppBar position='static'>
            <Toolbar>
                <Box ml={2}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <MenuIcon />
                    </IconButton>
                </Box>

                <Link href='/' replace>
                    <Typography variant='h6' style={{ cursor: 'pointer' }}>
                        Kids Edu
                    </Typography>
                </Link>
                <Box style={{ flexGrow: 1 }} />
                {links.map(l => {
                    if (l === 'login' && userId) {
                        l = 'profile';
                        return (
                            <Link href={'/' + l} key={l}>
                                <IconButton color='inherit'>
                                    <AccountCircleIcon />
                                </IconButton>
                            </Link>
                        );
                    }

                    return (
                        <Box pl={1}>
                            <Link href={'/' + l} key={l}>
                                <Button color='inherit'>{l}</Button>
                            </Link>
                        </Box>
                    );
                })}
            </Toolbar>
        </AppBar>
    );
}

export default ButtonAppBar;
