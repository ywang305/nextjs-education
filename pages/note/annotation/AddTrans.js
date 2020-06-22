import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Divider,
    Button,
    TextField,
    Fab,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import fetchAsync from '../../../lib/fetchAsync';
import { useRouter } from 'next/router';
import { postTransThunk } from '../../../lib/store/note/action';
import { useDispatch } from 'react-redux';
import { useProfile } from '../../login/profile';

export const useTrans = parag_id => {
    const dispatch = useDispatch();
    const {
        query: { note_id },
    } = useRouter();

    const [translate, setTranslate] = useState({ open: false, text: '' });

    const changeHandler = e => {
        setTranslate(t => ({ ...t, text: e.target?.value }));
    };

    const clickCancel = () => {
        setTranslate({
            open: false,
            text: '',
        });
    };

    const clickSubmit = async () => {
        const { text } = translate;
        if (text) {
            await dispatch(postTransThunk(note_id, parag_id, text));
        }
        clickCancel();
    };

    const clickOpen = () => {
        setTranslate(t => ({ ...t, open: true }));
    };

    return [
        translate.open,
        translate.text,
        changeHandler,
        clickCancel,
        clickSubmit,
        clickOpen,
    ];
};

const AddTrans = ({ paragraph }) => {
    const [_, isSuperUser] = useProfile();

    const [
        open,
        text,
        changeHandler,
        clickCancel,
        clickSubmit,
        clickOpen,
    ] = useTrans(paragraph?._id);

    if (isSuperUser && open) {
        return (
            <Box>
                <TextField
                    color='primary'
                    variant='outlined'
                    fullWidth
                    label='输入翻译'
                    placeholder={paragraph?.trans}
                    value={text}
                    onChange={changeHandler}
                />

                <Box display='flex' justifyContent='flex-end'>
                    <Box pr={4}>
                        <Button
                            onClick={clickSubmit}
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
    }
    return (
        <Typography paragraph color='textSecondary'>
            {paragraph?.trans}
            {isSuperUser &&
                (paragraph?.trans ? (
                    <Box component='span' pl={2}>
                        <IconButton color='secondary' onClick={clickOpen}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Fab
                        variant='extended'
                        color='secondary'
                        onClick={clickOpen}
                    >
                        <EditIcon />
                        添加此句翻译
                    </Fab>
                ))}
        </Typography>
    );
};

export default AddTrans;
