import React, { useState, useCallback, useEffect, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { TreeView, TreeItem } from '@material-ui/lab';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';

import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import SpeedIcon from '@material-ui/icons/Speed';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';
import { useSpeechSynthesis } from 'react-speech-kit';

const useMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const clickOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const closeHandler = () => {
        setAnchorEl(null);
    };
    return [anchorEl, clickOpen, closeHandler];
};

const useSetting = () => {
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1); // 0.1 - 10
    const [voice, setVoice] = useState(null);

    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();

    const speakHandler = text => () => {
        speak({ text, voice, rate, pitch });
    };

    return [
        pitch,
        setPitch,
        rate,
        setRate,
        voice,
        setVoice,
        speakHandler,
        cancel,
        speaking,
        supported,
        voices.filter(v => /^en|^zh|^ja/.test(v.lang)),
    ];
};

const SpeechSetting = () => {
    const [anchorEl, clickOpen, closeHandler] = useMenu();
    const [
        pitch,
        setPitch,
        rate,
        setRate,
        voice,
        setVoice,
        speakHandler,
        cancel,
        speaking,
        supported,
        voices,
    ] = useSetting();

    return (
        <div>
            <IconButton onClick={clickOpen} disabled={!supported}>
                <SettingsVoiceIcon />
                {!supported &&
                    'Oh no, it looks like your browser does not support Speech Synthesis.'}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeHandler}
            >
                <Box p={2} width={300}>
                    <Box display='flex' border={1} p={1}>
                        <Box px={1} flex={1}>
                            <Typography color='textSecondary' variant='caption'>
                                Hi, I am a robot. How are you doing today?
                            </Typography>
                        </Box>
                        <Button
                            onClick={
                                speaking
                                    ? cancel
                                    : speakHandler(
                                          'Hi, I am a robot. How are you doing today?'
                                      )
                            }
                            variant='contained'
                            color='secondary'
                            startIcon={
                                speaking ? <StopIcon /> : <KeyboardVoiceIcon />
                            }
                        >
                            Test
                        </Button>
                    </Box>
                    <Box aria-label='rate' py={2}>
                        <Typography>{`语速 ${rate}x`}</Typography>
                        <Slider
                            valueLabelDisplay='auto'
                            valueLabelFormat={x => `${x}x`}
                            value={rate}
                            min={1}
                            max={3}
                            step={0.1}
                            onChange={(event, newValue) => setRate(newValue)}
                        />
                    </Box>
                    <Box aria-label='pitch'>
                        <Typography>{`语调 ${Math.round(
                            (pitch - 1) * 10
                        )}`}</Typography>
                        <Slider
                            valueLabelDisplay='auto'
                            valueLabelFormat={x =>
                                `${Math.round((x - 1) * 10)}`
                            }
                            value={pitch}
                            min={0}
                            max={2}
                            step={0.1}
                            onChange={(event, newValue) => setPitch(newValue)}
                        />
                    </Box>
                    <TextField
                        select
                        label='Select Voice'
                        value={voice?.name ?? ''}
                        onChange={e => {
                            const found = voices.find(
                                v => v.name === e.target.value
                            );
                            setVoice(found);
                        }}
                        SelectProps={{
                            native: true,
                        }}
                        variant='filled'
                    >
                        <option value=''>Default</option>
                        {voices.map(v => (
                            <option key={v.name} value={v.name}>
                                {v.name}
                            </option>
                        ))}
                    </TextField>
                </Box>
            </Menu>
        </div>
    );
};

export default SpeechSetting;
