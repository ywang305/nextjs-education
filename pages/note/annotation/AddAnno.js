import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Divider,
    Button,
    TextField,
} from '@material-ui/core';
import fetchAsync from '../../../lib/fetchAsync';
import { useRouter } from 'next/router';
import { postCommentsThunk } from '../../../lib/store/note/action';
import { useDispatch } from 'react-redux';
import { useProfile } from '../../login/profile';

export const useComment = parag_id => {
    const dispatch = useDispatch();
    const {
        query: { note_id },
    } = useRouter();

    const [editAnno, setEditAnno] = useState({ open: false, text: '' });
    const clickOpen = () => {
        setEditAnno({ open: true, text: '' });
    };
    const changeText = e =>
        setEditAnno(a => ({
            ...a,
            text: e.target?.value,
        }));

    const clickCancel = () => {
        setEditAnno({
            open: false,
            text: '',
        });
    };

    const [userId] = useProfile();

    const clickConfirmToSubmit = async () => {
        const newComments = editAnno.text?.split('\n').map(c => ({
            text: c,
            fromUserId: userId,
        }));
        dispatch(postCommentsThunk(note_id, parag_id, newComments));

        clickCancel();
    };

    return [
        clickConfirmToSubmit,
        editAnno.open,
        editAnno.text,
        clickOpen,
        changeText,
        clickCancel,
    ];
};

const AddAnno = ({ parag_id }) => {
    const [
        clickConfirmToSubmit,
        open,
        text,
        clickOpen,
        changeText,
        clickCancel,
    ] = useComment(parag_id);

    return !open ? (
        <Button variant='outlined' color='primary' onClick={clickOpen}>
            为这句添加笔记
        </Button>
    ) : (
        <Box border={1} borderRadius={8} p={2}>
            <TextField
                color='primary'
                variant='outlined'
                fullWidth
                label='添加笔记'
                multiline
                rows={3}
                value={text}
                onChange={changeText}
                helperText='可以使用换行键，添加多条笔记'
            />
            <Box display='flex' justifyContent='flex-end'>
                <Box pr={4}>
                    <Button
                        onClick={clickConfirmToSubmit}
                        variant='contained'
                        color='primary'
                    >
                        提交
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

export default AddAnno;
