import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import InputArticle from './InputArticle';
import NoteList from './NoteList';
import Fab from '@material-ui/core/Fab';
import NoteAddIcon from '@material-ui/icons/NoteAddOutlined';
import { useTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';
import { useProfile } from '../login/Profile';

const NotePage = () => {
    const theme = useTheme();

    const [userId, isSuperId] = useProfile();

    return (
        <div>
            <Box>
                <NoteList />
            </Box>
            {isSuperId && (
                <Link href='/note/InputArticle'>
                    <Fab
                        aria-label='create note fab'
                        variant='extended'
                        color='secondary'
                        style={{
                            position: 'fixed',
                            bottom: theme.spacing(4),
                            right: theme.spacing(4),
                        }}
                    >
                        <NoteAddIcon />
                        <Box px={2}>添加</Box>
                    </Fab>
                </Link>
            )}
        </div>
    );
};

export default NotePage;
