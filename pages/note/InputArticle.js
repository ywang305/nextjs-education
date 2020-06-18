import React, { useState, useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import fetchAsync from '../../lib/fetchAsync';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Link from 'next/link';
import Route from 'next/router';

const InputWords = () => {
    const [article, setArticle] = useState({ book: '', title: '', text: '' });
    const { book, title, text } = article;

    const changeHandler = useCallback(e => {
        const { name, value } = e.target;
        setArticle(p => ({ ...p, [name]: value }));
    }, []);
    const submitHandler = async e => {
        e.preventDefault();
        if (book && title && text) {
            const url = '/api/note';
            const fromUserId = undefined;
            const res = await fetchAsync(url, {
                method: 'POST',
                body: { fromUserId, book, title, text },
            });
            Route.back();
        }
    };

    return (
        <form onSubmit={submitHandler} onChange={changeHandler}>
            <TextField
                name='book'
                fullWidth
                label='Book'
                value={book}
                variant='outlined'
                margin='normal'
            />
            <TextField
                name='title'
                fullWidth
                label='Title'
                value={title}
                variant='outlined'
                margin='normal'
            />
            <Box py={1} pr={1}>
                <TextareaAutosize
                    name='text'
                    style={{ width: '100%' }}
                    rowsMin={10}
                    placeholder='Input Article'
                    value={text}
                />
            </Box>
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
