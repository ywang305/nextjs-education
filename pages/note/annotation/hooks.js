import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSpeechSynthesis from '../../../lib/html5/useSpeechSynthesis';

export const usePopover = () => {
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorPosition, setAnchorPosition] = useState(null);
    const [selectText, setSelectText] = useState(null);

    const openPopover = event => {
        // setAnchorEl(event.currentTarget);
        const stxt = window?.getSelection()?.toString();
        if (/[a-z0-9]/i.test(stxt)) {
            setSelectText(stxt);
            const { clientX, clientY } = event;
            setAnchorPosition({ left: clientX, top: clientY - 10 });
        }
    };

    const closePopoverHandler = () => {
        setAnchorPosition(null);
        // setAnchorEl(null);
    };

    return [
        selectText,
        setSelectText,
        anchorPosition,
        openPopover,
        closePopoverHandler,
    ];
};

export const usePlaySpeech = () => {
    const speech = useSelector(state => state.device.speech);
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
    const clickPlayHandler = text => () => {
        const { voiceName, rate, pitch } = speech;
        const voice = voices.find(v => v.name === voiceName);
        speak({ text, voice, rate, pitch });
    };
    return [clickPlayHandler, cancel, speaking, supported];
};

export const useLoopSpeech = () => {
    const [clickPlayHandler, cancel, speaking, supported] = usePlaySpeech();
    const clickLoopHandler = text => () => {
        let txt = text;
        for (let i = 0; i < 5; ++i) {
            txt += ' ' + text;
        }
        clickPlayHandler(txt)();
    };
    return [clickLoopHandler, cancel, speaking, supported];
};

export const useEditAnnoDlg = () => {
    const [openDlg, setOpenDlg] = useState(false);
    return [openDlg, setOpenDlg];
};

export default () => {};
