import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Typography,
    Divider,
    CardHeader,
    Card,
    Avatar,
    IconButton,
    CardContent,
    Fab,
} from '@material-ui/core';

import { useRouter } from 'next/router';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import fetchAsync from '../../lib/fetchAsync';
import Paragraph from './annotation/Paragraph';
// import SpeechSetting from './setting/SpeechSetting';
import SingleMode from './setting/SingleMode';
import AnnoToggle from './setting/AnnoToggle';
import dynamic from 'next/dynamic';
const SpeechSetting = dynamic(() => import('./setting/SpeechSetting'), {
    ssr: false,
});

const useNote = () => {
    const { query } = useRouter();
    const { note_id } = query;
    const url = '/api/note/' + note_id;

    const [note, setNote] = useState({
        _id: '',
        book: '',
        title: '',
        paragraphs: [],
        updatedAt: '',
    });
    useEffect(() => {
        const reqNote = async () => {
            const note = await fetchAsync(url);
            setNote(note);
        };
        if (note_id) {
            reqNote();
        }
    }, [note_id]);

    return [note._id, note.book, note.title, note.updatedAt, note.paragraphs];
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
    const [_id, book, title, updatedAt, paragraphs] = useNote();
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
                {singleMode && (
                    <Box display='flex' justifyContent='space-between' pb={2}>
                        <Fab
                            variant='extended'
                            color='secondary'
                            onClick={() => setParagIndex(paragIndex - 1)}
                            disabled={paragIndex === 0}
                        >
                            <NavigateBeforeIcon />
                            上句
                        </Fab>
                        <Fab
                            variant='extended'
                            color='secondary'
                            onClick={() => setParagIndex(paragIndex + 1)}
                            disabled={paragIndex === paragraphs.length - 1}
                        >
                            下句
                            <NavigateNextIcon />
                        </Fab>
                    </Box>
                )}
                {singleMode ? (
                    <Paragraph
                        focused
                        paragraph={paragraphs[paragIndex ?? 0]}
                        annoOpen={annoOpen}
                        setAnnoOpen={setAnnoOpen}
                    />
                ) : (
                    paragraphs.map((paragraph, i) => {
                        const focused = paragIndex === i;
                        return (
                            <Paragraph
                                key={paragraph?._id}
                                focused={focused}
                                paragraph={paragraph}
                                setParagIndex={() => {
                                    if (!focused) setParagIndex(i);
                                }}
                                annoOpen={annoOpen}
                                setAnnoOpen={setAnnoOpen}
                                singleMode={singleMode}
                                setSingleMode={setSingleMode}
                            />
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
};
export default Note;
