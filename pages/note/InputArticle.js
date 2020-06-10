import React, { useState, useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import fetchAsync from '../../lib/fetchAsync';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Link from 'next/link';
import Route from 'next/router';

const InputWords = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const changeHandler = useCallback(e => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'text':
                setText(value);
                break;
        }
    }, []);
    const submitHandler = useCallback(
        async e => {
            e.preventDefault();
            if (title && text) {
                const url = '/api/note';
                const fromUserId = undefined;
                const res = await fetchAsync(url, {
                    method: 'POST',
                    body: { fromUserId, title, text },
                });
                Route.back();
            }
        },
        [title, text]
    );

    return (
        <form onSubmit={submitHandler} onChange={changeHandler}>
            <TextField
                name='title'
                fullWidth
                label='Title'
                value={title}
                variant='outlined'
                margin='normal'
            />
            <TextareaAutosize
                name='text'
                style={{ width: '100%' }}
                rowsMin={6}
                placeholder='Input Article'
            />
            <Box py={1} display='flex' justifyContent='flex-end'>
                <Box mx={2}>
                    <Button color='primary' onClick={() => Route.back()}>
                        Cancel
                    </Button>
                </Box>

                <Button type='submit' variant='contained' color='primary'>
                    Submit Article
                </Button>
            </Box>
        </form>
    );
};

export default InputWords;
