import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import fetchAsync from '../../lib/fetchAsync';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Route from 'next/router';
import { useProfile } from '../login/profile';

const InputWords = () => {
    // user role for authroziation
    const [userId] = useProfile();

    // main-logic
    const [article, setArticle] = useState({
        book: '',
        title: '',
        text: '',
    });
    const { book, title, text } = article;

    const changeHandler = useCallback(e => {
        const { name, value } = e.target;
        setArticle(p => ({ ...p, [name]: value }));
    }, []);
    const submitHandler = async e => {
        e.preventDefault();
        if (book && title && text) {
            const url = '/api/note';
            const fromUserId = userId;
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

            <Box p={2}>
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
                    <Button
                        color='primary'
                        onClick={() => {
                            const paragText = text
                                ?.replace(/([.?!\n])\s*(?=[A-Z])/g, '$1|')
                                .split('|')
                                .map(t => '  ' + t.trim())
                                .join('\n\n');
                            setArticle(s => ({ ...s, text: paragText }));
                        }}
                    >
                        自动分段
                    </Button>
                </Box>

                <Box mx={2}>
                    <Button color='primary' onClick={() => Route.back()}>
                        取消
                    </Button>
                </Box>

                <Button type='submit' variant='contained' color='primary'>
                    提交
                </Button>
            </Box>
        </form>
    );
};

export default InputWords;
