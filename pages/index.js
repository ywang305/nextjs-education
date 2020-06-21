import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonAppBar from './components/ButtonAppBar';
import { useProfile } from './login/profile';
import { Typography, Box, useTheme } from '@material-ui/core';

const Home = () => {
    const theme = useTheme();
    const [userId] = useProfile();
    return (
        <Box display='flex' justifyContent='center' p={theme.spacing(1)}>
            <main>
                <Typography variant='h5' color='primary'>{`hello ${
                    userId || 'anonymous'
                }`}</Typography>
            </main>
        </Box>
    );
};

export default Home;
