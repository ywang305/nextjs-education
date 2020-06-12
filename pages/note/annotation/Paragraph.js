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
import ReplayIcon from '@material-ui/icons/Replay';
import TextField from '@material-ui/core/TextField';
import fetchAsync from '../../../lib/fetchAsync';
import speak from '../../../lib/html5/speak';
import ButtonPopover from '../../components/ButtonPopover';
import AlertIOS from '../../components/AlertIOS';

const usePopover = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openPopover = event => {
        setAnchorEl(event.currentTarget);
    };

    const closeHandler = () => {
        setAnchorEl(null);
    };

    return [anchorEl, openPopover, closeHandler];
};

const useSpeech = () => {
    const [speaking, setSpeaking] = useState(false);
    const clickToSpeak = text => () => {
        setSpeaking(true);
        speak(text);
        setSpeaking(false);
    };
    const clickToReCycleSpeak = text => () => {};

    return [clickToSpeak];
};

const Paragraph = ({ text = '' }) => {
    const [anchorEl, openPopover, closeHandler] = usePopover();
    const open = Boolean(anchorEl);

    const [clickToSpeak] = useSpeech();

    return (
        <div>
            <Typography paragraph onClick={openPopover}>
                {text}
            </Typography>
            <ButtonPopover anchorEl={anchorEl} onClose={closeHandler}>
                <IconButton
                    size='small'
                    color='secondary'
                    onClick={clickToSpeak(text)}
                >
                    <PlayArrowIcon />
                </IconButton>
                <IconButton
                    size='small'
                    color='secondary'
                    // onClick={}
                >
                    <ReplayIcon />
                </IconButton>
                <IconButton
                    size='small'
                    color='secondary'
                    // onClick={}
                >
                    <NotesIcon />
                </IconButton>
            </ButtonPopover>
        </div>
    );
};
export default Paragraph;
