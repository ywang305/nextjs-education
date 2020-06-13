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

    const paragraphs = note.text
        .replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
        .split('|');

    return [note._id, note.title, note.updatedAt, paragraphs];
};

const useSingle = () => {
    const [paragIndex, setParagIndex] = useState(null); // track current reading paragraph
    const [singleMode, setSingleMode] = useState(false);
    return [singleMode, setSingleMode, paragIndex, setParagIndex];
};

const Note = () => {
    const [_id, title, updatedAt, paragraphs] = useNote();
    const [singleMode, setSingleMode, paragIndex, setParagIndex] = useSingle();

    return (
        <Card>
            <CardHeader
                avatar={<Avatar>R</Avatar>}
                action={
                    <Box display='flex'>
                        <SingleMode
                            singleMode={singleMode}
                            setSingleMode={setSingleMode}
                        />
                        <Divider orientation='vertical' flexItem />
                        <SpeechSetting />
                    </Box>
                }
                title={title}
                subheader={_id ? new Date(updatedAt).toLocaleString() : ''}
            />
            <CardContent>
                {singleMode ? (
                    <Paragraph text={paragraphs[paragIndex ?? 0]} />
                ) : (
                    paragraphs.map((parag, i) => {
                        return (
                            <Paragraph
                                key={i}
                                text={parag}
                                setParagIndex={() => {
                                    if (paragIndex !== i) setParagIndex(i);
                                }}
                            />
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
};
export default Note;
