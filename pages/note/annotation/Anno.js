import React, { useState, useCallback, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
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
import AlertIOS from '../../components/AlertIOS';
import { usePopover, usePlaySpeech, useLoopSpeech, useAnno } from './hooks';

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

const Anno = () => {
    const annoDict = new Map([
        [
            'London',
            [
                {
                    comment: '伦敦',
                    userId: 'Jack',
                    updatedAt: '2020-01-03T13:22',
                },
                {
                    comment: '是伦敦意思',
                    userId: '秋名山老司机',
                    updatedAt: '2020-04-01T00:12',
                },
                {
                    comment: 'London？ 没去过这里',
                    userId: '我叫大海',
                    updatedAt: '2020-04-01T06:30',
                },
            ],
        ],
        [
            'hotdog',
            [
                {
                    comment: '热死个🐶',
                    userId: 'Jack',
                    updatedAt: '2020-01-03T13:25',
                },
                {
                    comment: '🌭️ 好吃的',
                    userId: 'Tom',
                    updatedAt: '2020-03-11T09:12',
                },
            ],
        ],
        [
            'rubble',
            [
                {
                    comment: '碎块，碎石头，瓦砾. be destroyed, broken up',
                    userId: 'Tom',
                    updatedAt: '2020-03-05T19:20',
                },
            ],
        ],
    ]);

    return (
        <Box border={1} borderRadius={8} borderColor='grey.500' ml={2} p={2}>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {[...annoDict].map(([keyword, annoArr]) => {
                    return (
                        <TreeItem
                            key={keyword}
                            nodeId={keyword}
                            label={keyword}
                        >
                            {annoArr.map(
                                ({ comment, userId, updatedAt }, j) => {
                                    const RandomIcon =
                                        icons[
                                            Math.floor(
                                                Math.random() * icons.length
                                            )
                                        ];
                                    return (
                                        <ListItem key={j}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <RandomIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={comment}
                                                secondary={`${userId}   ${new Date(
                                                    updatedAt
                                                ).toLocaleString()}`}
                                            />
                                        </ListItem>
                                    );
                                }
                            )}
                        </TreeItem>
                    );
                })}
            </TreeView>
        </Box>
    );
};
export default Anno;
