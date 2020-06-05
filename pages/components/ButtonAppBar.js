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

export function ButtonAppBar() {
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
                <Box flexGrow={1} />
                <Link href='/spell'>
                    <Button color='inherit'>SPELL</Button>
                </Link>
                <Button color='inherit'>Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default ButtonAppBar;
