import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';

import { useTheme } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const LoginPage = () => {
    const theme = useTheme();
    return (
        <Box display='flex' justifyContent='center' pt={theme.spacing(1)} b>
            <Box maxWidth={400}>
                <form>
                    <TextField label='User Name' fullWidth margin='normal' />
                    <TextField
                        type='password'
                        label='Password'
                        fullWidth
                        margin='normal'
                    />
                    <Box py={2}>
                        <Button variant='contained' color='primary'>
                            Login
                        </Button>
                    </Box>

                    <Link href='/login/signup'>New User ?</Link>
                </form>
            </Box>
        </Box>
    );
};

export default LoginPage;
