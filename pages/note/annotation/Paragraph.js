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
import grey from '@material-ui/core/colors/grey';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NotesIcon from '@material-ui/icons/Notes';
import CloseIcon from '@material-ui/icons/Close';
import ReplayIcon from '@material-ui/icons/Replay';
import ButtonPopover from '../../components/ButtonPopover';
import AlertIOS from '../../components/AlertIOS';
import CreateIcon from '@material-ui/icons/Create';
import StopIcon from '@material-ui/icons/Stop';

import {
    usePopover,
    usePlaySpeech,
    useLoopSpeech,
    useEditAnnoDlg,
} from './hooks';
import Anno from './Anno';
import EditAnnoDlg from './EditAnnoDlg';

const Paragraph = ({ text = '', focused = false, setParagIndex, annoOpen }) => {
    const [
        selectText,
        setSelectText,
        anchorPosition,
        openPopover,
        closePopoverHandler,
    ] = usePopover();
    const [clickPlayHandler, cancel, speaking, supported] = usePlaySpeech();
    const [clickLoopHandler, cancelLoop, speakingLoop] = useLoopSpeech();
    const [openDlg, setOpenDlg] = useEditAnnoDlg();

    return (
        <div onClick={setParagIndex}>
            <Box borderRadius={8} borderColor='grey.500'>
                <Typography
                    paragraph
                    onPointerUp={openPopover}
                    style={{
                        backgroundColor: focused ? grey[50] : 'transparent',
                        ['user-select']: 'text',
                        ['-webkit-user-select']: 'text',
                    }}
                >
                    {text}
                </Typography>

                <Collapse in={annoOpen}>
                    <>
                        {focused && (
                            <Button
                                variant='outlined'
                                color='secondary'
                                onClick={() => {
                                    setSelectText('');
                                    setOpenDlg(d => !d);
                                }}
                            >
                                为这句添加笔记
                            </Button>
                        )}
                        <Anno />
                    </>
                </Collapse>
                {annoOpen && (
                    <Box pb={2}>
                        <Divider />
                    </Box>
                )}
            </Box>

            <ButtonPopover
                anchorReference='anchorPosition'
                anchorPosition={anchorPosition}
                onClose={closePopoverHandler}
            >
                <Tooltip title={'播放'} placement='top-start'>
                    <IconButton
                        color='secondary'
                        disabled={!supported}
                        onClick={
                            speaking ? cancel : clickPlayHandler(selectText)
                        }
                    >
                        {speaking ? <StopIcon /> : <PlayArrowIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={'重复播放'} placement='top-start'>
                    <IconButton
                        color='secondary'
                        disabled={!supported}
                        onClick={
                            speakingLoop
                                ? cancelLoop
                                : clickLoopHandler(selectText)
                        }
                    >
                        {speakingLoop ? <StopIcon /> : <ReplayIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={'添加笔记'} placement='top-start'>
                    <IconButton
                        color='secondary'
                        onClick={() => {
                            closePopoverHandler();
                            setOpenDlg(d => !d);
                        }}
                    >
                        <CreateIcon />
                    </IconButton>
                </Tooltip>
            </ButtonPopover>
            <EditAnnoDlg
                annotatedText={selectText}
                open={openDlg}
                onClose={() => setOpenDlg(d => !d)}
            />
        </div>
    );
};
export default Paragraph;
