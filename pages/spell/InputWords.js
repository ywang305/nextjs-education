import React, { useState, useCallback, useMemo } from 'react';
import { Button, TextField } from '@material-ui/core';
import fetchAsync from '../../lib/fetchAsync';

const postPath = '/api/spell';
const postMeta = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

const InputWords = () => {
    const [value, setValue] = useState('');

    const changeHandler = useCallback(e => {
        const { value } = e.target;
        setValue(value);
    }, []);
    const submitHandler = useCallback(
        async e => {
            e.preventDefault();
            if (value) {
                const url = '/api/spell';
                const fromUserId = undefined;
                const toUserId = undefined;
                const words = value;
                const res = await fetchAsync(url, {
                    method: 'POST',
                    body: { fromUserId, toUserId, words },
                });
                setValue('');
            }
        },
        [value]
    );

    return (
        <form onSubmit={submitHandler}>
            <TextField
                name='textfield'
                fullWidth
                label='Input Words'
                multiline
                rows={4}
                value={value}
                onChange={changeHandler}
                variant='outlined'
            />
            <Button type='submit' variant='contained' color='primary'>
                Send
            </Button>
        </form>
    );
};

export default InputWords;
