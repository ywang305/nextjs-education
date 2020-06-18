import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useSpeechSynthesis from '../../../lib/html5/useSpeechSynthesis';
import fetchAsync from '../../../lib/fetchAsync';

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

    return [selectText, anchorPosition, openPopover, closePopoverHandler];
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

export const useQueryDict = selectedWord => {
    const [dict, setDict] = useState(null);

    useEffect(() => {
        const query = async () => {
            const res = await fetchAsync(
                '/api/dicts/' + encodeURI(selectedWord)
            );
            if (res?.label) {
                setDict(res.label);
            }
        };
        if (selectedWord?.length > 1) query();
    }, [selectedWord]);

    return [dict];
};

export const useAddCommentsToServer = () => {
    const {
        query: { note_id },
    } = useRouter();

    const clickToAdd = async (parag_id, addedComments, commentsCallback) => {
        const comments = await fetchAsync('/api/note/comment', {
            method: 'POST',
            body: {
                note_id,
                parag_id,
                comments: addedComments,
            },
        });
        commentsCallback?.(comments);
    };
    const getComments = async (parag_id, commentsCallback) => {
        await clickToAdd(parag_id, undefined, commentsCallback);
    };

    return [clickToAdd, getComments];
};

export default () => {};
