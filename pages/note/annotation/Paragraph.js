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
    ListItemAvatar,
    ListItemSecondaryAction,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import grey from '@material-ui/core/colors/grey';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NotesIcon from '@material-ui/icons/Notes';
import CloseIcon from '@material-ui/icons/Close';
import ReplayIcon from '@material-ui/icons/Replay';
import ButtonPopover from '../../components/ButtonPopover';
import AlertIOS from '../../components/AlertIOS';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import StopIcon from '@material-ui/icons/Stop';
import Avatar from '@material-ui/core/Avatar';
import GitHubIcon from '@material-ui/icons/GitHub';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import {
    usePopover,
    usePlaySpeech,
    useLoopSpeech,
    useQueryDict,
    useComment,
} from './hooks';
import AddAnno from './AddAnno';
import { useNote, useSetting } from '../[note_id]';
import AddImage from './AddImage';
import AddTrans from './AddTrans';
import { useProfile } from '../../login/profile';

const Paragraph = ({ paragraph, focused = false }) => {
    const [
        selectText,
        anchorPosition,
        openPopover,
        closePopoverHandler,
    ] = usePopover();
    const [clickPlayHandler, cancel, speaking, supported] = usePlaySpeech();
    const [clickLoopHandler, cancelLoop, speakingLoop] = useLoopSpeech();
    const [dict] = useQueryDict(selectText);

    const [
        { single, annoOpen, paragIndex, transOpen },
        dispatchSetting,
    ] = useSetting();
    const [note] = useNote();

    const myParagIndex = note?.paragraphs?.findIndex(
        p => p._id === paragraph._id
    );

    const [addCommentHandler, deleteCommentHandler] = useComment();
    const [userId, isSuperId] = useProfile();

    return (
        <div
            onClick={() => {
                if (myParagIndex !== paragIndex)
                    dispatchSetting({ paragIndex: myParagIndex });
            }}
        >
            <Box>
                <div
                    onDoubleClick={() => {
                        if (!annoOpen && !single) {
                            dispatchSetting({
                                single: true,
                                annoOpen: true,
                                paragIndex: myParagIndex,
                            });
                        }
                    }}
                >
                    <Typography
                        paragraph
                        onPointerUp={openPopover}
                        style={{
                            backgroundColor: focused ? grey[50] : 'transparent',
                            UserSelect: 'text',
                            WebkitUserSelect: 'text',
                        }}
                    >
                        {paragraph?.text}
                    </Typography>
                    {transOpen && <AddTrans paragraph={paragraph} />}
                </div>

                <Collapse in={annoOpen}>
                    <>
                        <Box>
                            {paragraph?.images?.map((m, i) => (
                                <img key={i} src={m} alt='注解图片' />
                            ))}
                        </Box>
                        {focused && (
                            <Box>
                                <Box px={1} component='span'>
                                    <AddImage parag_id={paragraph?._id} />
                                </Box>
                                <Box px={1} component='span'>
                                    <AddAnno parag_id={paragraph?._id} />
                                </Box>
                            </Box>
                        )}
                        <List
                            aria-labelledby='nested-list-subheader'
                            subheader={
                                <ListSubheader
                                    component='div'
                                    id='nested-list-subheader'
                                >
                                    笔记
                                </ListSubheader>
                            }
                        >
                            {paragraph?.comments?.map((commObj, j) => {
                                const {
                                    _id,
                                    text,
                                    fromUserId,
                                    updatedAt,
                                } = commObj;
                                return (
                                    <ListItem key={j}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <GitHubIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={text}
                                            secondary={`${fromUserId} - ${new Date(
                                                updatedAt
                                            ).toLocaleString()}`}
                                        />
                                        {(isSuperId ||
                                            fromUserId === userId) && (
                                            <ListItemSecondaryAction>
                                                <Tooltip title='删除这条笔记'>
                                                    <IconButton
                                                        color='secondary'
                                                        edge='end'
                                                        aria-label='delete'
                                                        onClick={deleteCommentHandler(
                                                            note?._id,
                                                            paragraph?._id,
                                                            _id
                                                        )}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </ListItemSecondaryAction>
                                        )}
                                    </ListItem>
                                );
                            })}
                        </List>
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
                <Box>
                    <Box>
                        <Tooltip title={'播放'} placement='top-start'>
                            <IconButton
                                color='secondary'
                                disabled={!supported}
                                onClick={
                                    speaking
                                        ? cancel
                                        : clickPlayHandler(selectText)
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
                        <Tooltip title={'收录到笔记'} placement='top-start'>
                            <IconButton
                                color='secondary'
                                onClick={async () => {
                                    const addedComments = [
                                        {
                                            fromUserId: undefined,
                                            text: selectText + ': ' + dict,
                                        },
                                    ];
                                    addCommentHandler(
                                        note?._id,
                                        paragraph._id,
                                        addedComments
                                    )();
                                    closePopoverHandler();
                                }}
                            >
                                <SaveAltIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box width={160} color='text.secondary' p={1}>
                        {dict}
                    </Box>
                </Box>
            </ButtonPopover>
        </div>
    );
};
export default Paragraph;
