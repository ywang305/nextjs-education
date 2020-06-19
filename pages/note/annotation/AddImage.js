import React, { useState, useCallback, useEffect } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import fetchAsync from '../../../lib/fetchAsync';
import { useRouter } from 'next/router';
import {
    postCommentsThunk,
    postImageUrlsThunk,
} from '../../../lib/store/note/action';
import { useDispatch } from 'react-redux';

export const useComment = parag_id => {
    const dispatch = useDispatch();
    const {
        query: { note_id },
    } = useRouter();

    const [editAnno, setEditAnno] = useState({ open: false, url: '' });
    const clickOpen = () => {
        setEditAnno({ open: true, url: '' });
    };
    const changeText = e =>
        setEditAnno(a => ({
            ...a,
            url: e.target?.value,
        }));

    const clickCancel = () => {
        setEditAnno({
            open: false,
            url: '',
        });
    };

    const clickConfirmToSubmit = async () => {
        const newURLs = editAnno.url?.split('\n');
        dispatch(postImageUrlsThunk(note_id, parag_id, newURLs));
        clickCancel();
    };

    return [
        clickConfirmToSubmit,
        editAnno.open,
        editAnno.url,
        clickOpen,
        changeText,
        clickCancel,
    ];
};

const AddImage = ({ parag_id }) => {
    const [
        clickConfirmToSubmit,
        open,
        url,
        clickOpen,
        changeText,
        clickCancel,
    ] = useComment(parag_id);

    return !open ? (
        <Button variant='outlined' color='primary' onClick={clickOpen}>
            为这句添加图片
        </Button>
    ) : (
        <Box border={1} borderRadius={8} p={2}>
            <TextField
                color='primary'
                variant='outlined'
                fullWidth
                label='添加图片链接'
                multiline
                rows={3}
                value={url}
                onChange={changeText}
                helperText='可以使用换行键，添加多条图片链接'
            />
            <Box display='flex' justifyContent='flex-end'>
                <Box pr={4}>
                    <Button
                        onClick={clickConfirmToSubmit}
                        variant='contained'
                        color='primary'
                    >
                        确定
                    </Button>
                </Box>
                <Box>
                    <Button onClick={clickCancel} variant='outlined'>
                        取消
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AddImage;
