import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';
import useSpeechSynthesis from '../../../lib/html5/useSpeechSynthesis';
import { updateDeviceSpeechUtteranceCreator } from '../../../lib/store/device/action';
import Tooltip from '@material-ui/core/Tooltip';

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
    const dispatch = useDispatch();
    const speech = useSelector(state => state.device.speech);
    const [pitch, setPitch] = useState(speech.pitch);
    const [rate, setRate] = useState(speech.rate);
    const [voiceName, setVoiceName] = useState(speech.voiceName);

    useEffect(
        function saveUtteranceOptionToRedux() {
            if (
                pitch != speech.pitch ||
                rate != speech.rate ||
                voiceName != speech.voiceName
            ) {
                dispatch(
                    updateDeviceSpeechUtteranceCreator({
                        pitch,
                        rate,
                        voiceName,
                    })
                );
            }
        },
        [pitch, rate, voiceName]
    );

    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();

    const speakHandler = text => () => {
        const voice = voices.find(v => v.name === voiceName);
        speak({ text, voice, rate, pitch });
    };

    return [
        pitch,
        setPitch,
        rate,
        setRate,
        voiceName,
        setVoiceName,
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
        voiceName,
        setVoiceName,
        speakHandler,
        cancel,
        speaking,
        supported,
        voices,
    ] = useSetting();

    return (
        <div>
            <Tooltip title='语音设置' aria-label='tip-speech'>
                <IconButton
                    onClick={clickOpen}
                    disabled={!supported}
                    color='secondary'
                >
                    <SettingsVoiceIcon />
                </IconButton>
            </Tooltip>

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
                                {`Hi, I am ${
                                    voiceName ? voiceName : 'a robot'
                                }. How are you doing today?`}
                            </Typography>
                        </Box>
                        <Button
                            onClick={
                                speaking
                                    ? cancel
                                    : speakHandler(
                                          `Hi, I am ${
                                              voiceName ? voiceName : 'a robot'
                                          }. How are you doing today?`
                                      )
                            }
                            variant='contained'
                            color='secondary'
                            startIcon={
                                speaking ? <StopIcon /> : <KeyboardVoiceIcon />
                            }
                        >
                            测试
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
                        <Typography>{`语调  ${Math.round(
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
                        label='选择声音'
                        value={voiceName}
                        onChange={e => {
                            setVoiceName(e.target.value);
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
