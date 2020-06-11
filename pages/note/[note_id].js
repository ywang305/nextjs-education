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

import MoreVertIcon from '@material-ui/icons/MoreVert';
import NoteIcon from '@material-ui/icons/Notes';

import { useRouter } from 'next/router';
import fetchAsync from '../../lib/fetchAsync';
import Annotation from './Annotation';

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
                action={
                    <IconButton aria-label='annotation'>
                        <NoteIcon />
                    </IconButton>
                }
                title={note.title}
                subheader={
                    note._id ? new Date(note.updatedAt).toLocaleString() : ''
                }
            />
            <CardContent>
                <Annotation text={note.text} />
            </CardContent>
        </Card>
    );
};
export default Note;
