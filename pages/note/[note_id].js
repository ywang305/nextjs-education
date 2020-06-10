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
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useKey } from 'react-use/lib';
import { useRouter } from 'next/router';
import fetchAsync from '../../lib/fetchAsync';

const Note = () => {
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

    return (
        <Card>
            <CardHeader
                avatar={<Avatar>R</Avatar>}
                action={
                    <IconButton aria-label='settings'>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={note.title}
                subheader={
                    note._id ? new Date(note.updatedAt).toLocaleString() : ''
                }
            />
            <CardContent>
                <Typography paragraph>{note.text}</Typography>
            </CardContent>
        </Card>
    );
};
export default Note;
