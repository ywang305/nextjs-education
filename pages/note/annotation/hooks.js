import { useState } from 'react';
import { useSelector } from 'react-redux';
import useSpeechSynthesis from '../../../lib/html5/useSpeechSynthesis';

export const usePopover = () => {
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorPosition, setAnchorPosition] = useState(null);
    const openPopover = event => {
        // setAnchorEl(event.currentTarget);
        const selectedText = window.getSelection()?.toString();
        if (selectedText) {
            const { clientX, clientY } = event;
            setAnchorPosition({ left: clientX, top: clientY - 10 });
        }
    };

    const closeHandler = () => {
        setAnchorPosition(null);
        // setAnchorEl(null);
    };

    return [anchorPosition, openPopover, closeHandler];
};

export const usePlaySpeech = () => {
    const speech = useSelector(state => state.device.speech);
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
    const clickPlayHandler = text => {
        const { voiceName, rate, pitch } = speech;

        if (text) {
            const voice = voices.find(v => v.name === voiceName);
            speak({ text, voice, rate, pitch });
        }
    };
    return [clickPlayHandler, cancel, speaking, supported];
};

export const useLoopSpeech = () => {
    const [clickPlayHandler, cancel, speaking, supported] = usePlaySpeech();
    const clickLoopHandler = () => {
        const selected = window.getSelection()?.toString();
        let repeated = selected;
        for (let i = 0; i < 5; ++i) {
            repeated += ' ' + selected;
        }
        clickPlayHandler(repeated);
    };
    return [clickLoopHandler, cancel, speaking, supported];
};

export const useAnno = () => {
    const [annoOpen, setAnnoOpen] = useState(false);
    return [annoOpen, setAnnoOpen];
};

export default useAnno;
