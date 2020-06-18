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
import WorkIcon from '@material-ui/icons/Work';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import AdbIcon from '@material-ui/icons/Adb';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AppleIcon from '@material-ui/icons/Apple';
import AndroidIcon from '@material-ui/icons/Android';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import BathtubIcon from '@material-ui/icons/Bathtub';
import BuildIcon from '@material-ui/icons/Build';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import CommuteIcon from '@material-ui/icons/Commute';
import DeckIcon from '@material-ui/icons/Deck';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import FlashAutoIcon from '@material-ui/icons/FlashAuto';
import GitHubIcon from '@material-ui/icons/GitHub';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const icons = [
    BeachAccessIcon,
    WorkIcon,
    AcUnitIcon,
    AdbIcon,
    AirlineSeatReclineExtraIcon,
    AllInclusiveIcon,
    AppleIcon,
    AndroidIcon,
    AttachMoneyIcon,
    AudiotrackIcon,
    BathtubIcon,
    BuildIcon,
    ChildFriendlyIcon,
    CommuteIcon,
    DeckIcon,
    DirectionsBikeIcon,
    DirectionsRunIcon,
    FingerprintIcon,
    FlashAutoIcon,
    GitHubIcon,
    RestaurantIcon,
];

import {
    usePopover,
    usePlaySpeech,
    useLoopSpeech,
    useQueryDict,
    useAddCommentsToServer,
} from './hooks';
import EditAnnoDlg from './EditAnnoDlg';
import AddAnno from './AddAnno';
import fetchAsync from '../../../lib/fetchAsync';

const Paragraph = ({
    paragraph,
    focused = false,
    setParagIndex,
    annoOpen,
    setAnnoOpen,
    singleMode,
    setSingleMode,
}) => {
    const [
        selectText,
        anchorPosition,
        openPopover,
        closePopoverHandler,
    ] = usePopover();
    const [clickPlayHandler, cancel, speaking, supported] = usePlaySpeech();
    const [clickLoopHandler, cancelLoop, speakingLoop] = useLoopSpeech();
    const [dict] = useQueryDict(selectText);

    const [clickToAdd, getComments] = useAddCommentsToServer();

    const [comments, setComments] = useState(paragraph?.comments);
    useEffect(() => {
        getComments(paragraph._id, cms => setComments(cms));
    }, [paragraph._id]);

    return (
        <div onClick={setParagIndex}>
            <Box borderRadius={8} borderColor='grey.500'>
                <div
                    onDoubleClick={() => {
                        if (!annoOpen && !singleMode) {
                            setSingleMode?.(s => !s);
                            setAnnoOpen?.(a => !a);
                            setParagIndex?.();
                        }
                    }}
                >
                    <Typography
                        paragraph
                        onPointerUp={openPopover}
                        style={{
                            backgroundColor: focused ? grey[50] : 'transparent',
                            ['user-select']: 'text',
                            ['-webkit-user-select']: 'text',
                        }}
                    >
                        {paragraph?.text}
                    </Typography>
                </div>

                <Collapse in={annoOpen}>
                    <>
                        {focused && (
                            <AddAnno
                                commentsCallback={cmts => setComments(cmts)}
                                parag_id={paragraph?._id}
                            />
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
                            {comments?.map((commObj, j) => {
                                const RandomIcon =
                                    icons[
                                        Math.floor(Math.random() * icons.length)
                                    ];
                                const { text, fromUserId, updatedAt } = commObj;
                                return (
                                    <ListItem key={j}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <RandomIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={text}
                                            secondary={`${fromUserId}   ${new Date(
                                                updatedAt
                                            ).toLocaleString()}`}
                                        />
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
                                    await clickToAdd(
                                        paragraph._id,
                                        addedComments,
                                        cms => setComments(cms)
                                    );
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
