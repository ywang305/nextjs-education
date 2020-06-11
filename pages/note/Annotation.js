import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Divider,
    Button,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NotesIcon from '@material-ui/icons/Notes';
import TextField from '@material-ui/core/TextField';

import fetchAsync from '../../lib/fetchAsync';
import speak from '../../lib/html5/speak';
import ButtonPopover from '../components/ButtonPopover';
import AlertIOS from '../components/AlertIOS';

const usePopover = () => {
    const [utterMsg, setUtterMsg] = useState('');
    const [openDlg, setOpenDlg] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openHandler = utterMsg => event => {
        setAnchorEl(event.currentTarget);
        setUtterMsg(utterMsg);
    };

    const closeHandler = () => {
        setAnchorEl(null);
    };

    const clickSpeechHandler = () => {
        speak(utterMsg);
        closeHandler();
    };

    const clickToggleDlg = () => {
        setOpenDlg(d => !d);
        closeHandler();
    };

    return [
        anchorEl,
        openHandler,
        closeHandler,
        utterMsg,
        clickSpeechHandler,
        openDlg,
        clickToggleDlg,
    ];
};

const Annotation = ({ text = '' }) => {
    const [
        anchorEl,
        openHandler,
        closeHandler,
        utterMsg,
        clickSpeechHandler,
        openDlg,
        clickToggleDlg,
    ] = usePopover();
    const open = Boolean(anchorEl);

    return (
        <div>
            {text
                .replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
                .split('|')
                .map((sentence, i) => {
                    return (
                        <Typography key={i} paragraph>
                            {sentence.split(' ').map((word, j) => {
                                return (
                                    <Box
                                        key={j}
                                        component='span'
                                        mr={1}
                                        onClick={openHandler(word)}
                                    >
                                        {word}
                                    </Box>
                                );
                            })}
                        </Typography>
                    );
                })}
            <ButtonPopover anchorEl={anchorEl} onClose={closeHandler}>
                <IconButton
                    size='small'
                    color='secondary'
                    onClick={clickSpeechHandler}
                >
                    <PlayArrowIcon />
                </IconButton>
                <IconButton
                    size='small'
                    color='secondary'
                    onClick={clickToggleDlg}
                >
                    <NotesIcon />
                </IconButton>
            </ButtonPopover>

            <AlertIOS open={openDlg} closeHandler={clickToggleDlg}>
                <Box p={2}>
                    <Typography
                        variant='h6'
                        color='primary'
                        align='center'
                        gutterBottom
                    >
                        {utterMsg}
                    </Typography>
                    <Divider />
                    <TextField
                        variant='outlined'
                        multiline
                        rows={2}
                        fullWidth
                        label={`为 ${utterMsg} 添加新注解`}
                        margin='normal'
                    />
                    <Box>
                        <Button color='secondary' variant='outlined' fullWidth>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </AlertIOS>
        </div>
    );
};
export default Annotation;
