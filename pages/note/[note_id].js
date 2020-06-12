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
    Drawer,
} from '@material-ui/core';
import { TreeView, TreeItem } from '@material-ui/lab';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';

import { useRouter } from 'next/router';
import fetchAsync from '../../lib/fetchAsync';
import Paragraph from './annotation/Paragraph';
import dynamic from 'next/dynamic';

const SpeechSetting = dynamic(() => import('./setting/SpeechSetting'), {
    ssr: false,
});

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
    return [note];
};

const Note = () => {
    const [note] = useNote();

    return (
        <Card>
            <CardHeader
                avatar={<Avatar>R</Avatar>}
                action={<SpeechSetting />}
                title={note.title}
                subheader={
                    note._id ? new Date(note.updatedAt).toLocaleString() : ''
                }
            />
            <CardContent>
                {note.text
                    .replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
                    .split('|')
                    .map((parag, i) => {
                        return <Paragraph key={i} text={parag} />;
                    })}
            </CardContent>
        </Card>
    );
};
export default Note;
