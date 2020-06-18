import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Divider,
    Button,
    Tooltip,
    TextField,
    Collapse,
} from '@material-ui/core';
import AlertIOS from '../../components/AlertIOS';

const EditAnnoDlg = ({ annotatedText, open, onClose }) => {
    const [annoItem, setAnnoItem] = useState({
        target: '',
        comment: '',
    });
    useEffect(() => {
        setAnnoItem(a => ({ ...a, target: annotatedText }));
    }, [annotatedText]);
    const { target, comment } = annoItem;

    return (
        <AlertIOS open={open} onClose={onClose}>
            <Box p={2}>
                <form
                    onChange={e => {
                        const { name, value } = e.target;
                        setAnnoItem(a => ({ ...a, [name]: value }));
                    }}
                >
                    <TextField
                        fullWidth
                        label={`被注解的单词/词组`}
                        margin='normal'
                        color='primary'
                        name='target'
                        value={target}
                    />
                    <TextField
                        variant='outlined'
                        multiline
                        rows={2}
                        fullWidth
                        label={`添加注解笔记`}
                        margin='normal'
                        name='comment'
                        value={comment}
                    />
                    <Box>
                        <Button color='primary' variant='contained' fullWidth>
                            确定
                        </Button>
                    </Box>
                </form>
            </Box>
        </AlertIOS>
    );
};
export default EditAnnoDlg;
