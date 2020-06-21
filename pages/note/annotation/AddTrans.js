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

    const clickConfirmToSubmit = async () => {
        const newComments = editAnno.text?.split('\n').map(c => ({
            text: c,
            fromUserId: undefined,
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

const AddTrans = ({ paragraph }) => {
    const { _id, trans } = paragraph;
    const [_, isSuperUser] = useProfile();

    if (isSuperUser) {
        return (
            <Box>
                <TextField
                    color='primary'
                    variant='outlined'
                    fullWidth
                    label='输入翻译'
                    value={trans}
                    // onChange={changeText}
                />

                <Box display='flex' justifyContent='flex-end'>
                    <Box pr={4}>
                        <Button
                            // onClick={clickConfirmToSubmit}
                            variant='contained'
                            color='primary'
                        >
                            提交
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            // onClick={clickCancel}
                            variant='outlined'
                        >
                            取消
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    }
    return (
        <Typography paragraph color='textSecondary'>
            {paragraph?.trans}
        </Typography>
    );
};

export default AddTrans;
