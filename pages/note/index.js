import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import InputArticle from './InputArticle';
import NoteList from './NoteList';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import { useTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const NotePage = () => {
    const theme = useTheme();
    return (
        <div>
            <Box>
                <NoteList />
            </Box>
            <Link href='/note/InputArticle'>
                <Fab
                    aria-label='create note fab'
                    color='secondary'
                    style={{
                        position: 'fixed',
                        bottom: theme.spacing(2),
                        right: theme.spacing(2),
                    }}
                >
                    <CreateIcon />
                </Fab>
            </Link>
        </div>
    );
};

export default NotePage;
