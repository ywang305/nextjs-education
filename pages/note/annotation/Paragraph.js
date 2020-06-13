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
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NotesIcon from '@material-ui/icons/Notes';
import CloseIcon from '@material-ui/icons/Close';
import ReplayIcon from '@material-ui/icons/Replay';
import ButtonPopover from '../../components/ButtonPopover';
import AlertIOS from '../../components/AlertIOS';
import CreateIcon from '@material-ui/icons/Create';
import StopIcon from '@material-ui/icons/Stop';

import { usePopover, usePlaySpeech, useLoopSpeech, useAnno } from './hooks';
import Anno from './Anno';

const Paragraph = ({ text = '', setParagIndex }) => {
    const [anchorPosition, openPopover, closeHandler] = usePopover();

    const [clickPlayHandler, cancel, speaking, supported] = usePlaySpeech();
    const [clickLoopHandler, cancelLoop, speakingLoop] = useLoopSpeech();
    const [annoOpen, setAnnoOpen] = useAnno();

    return (
        <div>
            <Box display='flex' alignItems='flex-end'>
                <Box pr={1}>
                    <Tooltip title={annoOpen ? '关闭注解' : '显示注解'}>
                        <IconButton
                            color='primary'
                            onClick={() => setAnnoOpen(a => !a)}
                        >
                            {annoOpen ? <CloseIcon /> : <NotesIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>

                <Typography
                    paragraph
                    onClick={e => {
                        setParagIndex?.();
                        if (/[a-z]/i.test(window?.getSelection()?.toString())) {
                            openPopover(e);
                        }
                    }}
                >
                    {text}
                </Typography>
            </Box>

            <ButtonPopover
                anchorReference='anchorPosition'
                anchorPosition={anchorPosition}
                onClose={closeHandler}
            >
                <Tooltip title={'播放'} placement='top-start'>
                    <IconButton
                        color='secondary'
                        disabled={!supported}
                        onClick={
                            speaking
                                ? cancel
                                : () => {
                                      const text = window
                                          ?.getSelection()
                                          ?.toString();
                                      if (/[a-z]/i.test(text)) {
                                          clickPlayHandler(text);
                                      }
                                  }
                        }
                    >
                        {speaking ? <StopIcon /> : <PlayArrowIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={'重复播放'} placement='top-start'>
                    <IconButton
                        color='secondary'
                        disabled={!supported}
                        onClick={speakingLoop ? cancelLoop : clickLoopHandler}
                    >
                        {speakingLoop ? <StopIcon /> : <ReplayIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={'添加注解'} placement='top-start'>
                    <IconButton color='secondary'>
                        <CreateIcon />
                    </IconButton>
                </Tooltip>
            </ButtonPopover>
            <Collapse in={annoOpen}>
                <Anno />
            </Collapse>
        </div>
    );
};
export default Paragraph;
