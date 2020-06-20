import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '@material-ui/core/styles';
import { Box, TextField, Button } from '@material-ui/core';

const LoginPage = () => {
    const theme = useTheme();
    return (
        <Box display='flex' justifyContent='center' pt={theme.spacing(1)}>
            <Box maxWidth={400}>
                <form>
                    <TextField label='User Name' fullWidth margin='normal' />
                    <TextField
                        type='password'
                        label='Password'
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        type='password'
                        label='Repeat Password'
                        fullWidth
                        margin='normal'
                    />
                    <Button variant='contained' color='primary'>
                        Register
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default LoginPage;
