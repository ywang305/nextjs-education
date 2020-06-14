import React, { useState, useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {
    Box,
    Typography,
    Divider,
    CardHeader,
    Card,
    Avatar,
    IconButton,
    CardContent,
} from '@material-ui/core';

import { useRouter } from 'next/router';
import fetchAsync from '../../lib/fetchAsync';
import Paragraph from './annotation/Paragraph';
import SpeechSetting from './setting/SpeechSetting';
import SingleMode from './setting/SingleMode';
import AnnoToggle from './setting/AnnoToggle';

const useNote = () => {
    const { query } = useRouter();
    const { note_id } = query;
    const [note, setNote] = useState({
        _id: '',
        title: '',
        text: '',
        updatedAt: '',
    });
    useEffect(() => {
        const reqNote = async () => {
            const note = await fetchAsync('/api/note/' + note_id);
            setNote(note);
        };
        if (note_id) {
            reqNote();
        }
    }, [note_id]);

    const paragraphs =
        note?.text?.replace(/([.?!])\s*(?=[A-Z])/g, '$1|').split('|') ?? [];

    return [note._id, note.title, note.updatedAt, paragraphs];
};

const useSingle = () => {
    const [paragIndex, setParagIndex] = useState(null); // track current reading paragraph
    const [singleMode, setSingleMode] = useState(false);
    return [singleMode, setSingleMode, paragIndex, setParagIndex];
};
const useAnnoToggle = () => {
    const [annoOpen, setAnnoOpen] = useState(false);
    return [annoOpen, setAnnoOpen];
};

const Note = () => {
    const [_id, title, updatedAt, paragraphs] = useNote();
    const [singleMode, setSingleMode, paragIndex, setParagIndex] = useSingle();
    const [annoOpen, setAnnoOpen] = useAnnoToggle();

    return (
        <Card>
            <CardHeader
                avatar={<Avatar alt='新概念' src='/xgn.jpeg' />}
                action={
                    <Box display='flex' alignItems='center'>
                        <Box>
                            <SingleMode
                                singleMode={singleMode}
                                setSingleMode={setSingleMode}
                            />
                            <AnnoToggle
                                annoOpen={annoOpen}
                                setAnnoOpen={setAnnoOpen}
                            />
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <SpeechSetting />
                    </Box>
                }
                title={title}
                subheader={_id ? new Date(updatedAt).toLocaleString() : ''}
            />
            <CardContent>
                {singleMode ? (
                    <Paragraph
                        focused
                        text={paragraphs[paragIndex ?? 0]}
                        annoOpen={annoOpen}
                    />
                ) : (
                    paragraphs.map((parag, i) => {
                        const focused = paragIndex === i;
                        return (
                            <Paragraph
                                key={i}
                                focused={focused}
                                text={parag}
                                setParagIndex={() => {
                                    if (!focused) setParagIndex(i);
                                }}
                                annoOpen={annoOpen}
                            />
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
};
export default Note;
