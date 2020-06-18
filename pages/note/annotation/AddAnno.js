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

export const useComment = (parag_id, commentsCallback) => {
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

    const clickConfirm = async () => {
        const newComments = editAnno.text?.split('\n').map(c => ({
            text: c,
            fromUserId: undefined,
        }));

        const comments = await fetchAsync('/api/note/comment', {
            method: 'POST',
            body: {
                note_id,
                parag_id,
                comments: newComments,
            },
        });
        commentsCallback?.(comments);

        clickCancel();
    };

    return [
        editAnno.open,
        editAnno.text,
        clickOpen,
        changeText,
        clickCancel,
        clickConfirm,
    ];
};

const AddAnno = ({ parag_id, commentsCallback }) => {
    const [
        open,
        text,
        clickOpen,
        changeText,
        clickCancel,
        clickConfirm,
    ] = useComment(parag_id, commentsCallback);

    return !open ? (
        <Button variant='outlined' color='secondary' onClick={clickOpen}>
            为这句添加笔记
        </Button>
    ) : (
        <div>
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
            <Button onClick={clickConfirm}>确定</Button>
            <Button onClick={clickCancel}>取消</Button>
        </div>
    );
};

export default AddAnno;
