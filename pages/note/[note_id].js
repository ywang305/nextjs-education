import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    Button,
} from '@material-ui/core';

import { useRouter } from 'next/router';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import fetchAsync from '../../lib/fetchAsync';
import Paragraph from './annotation/Paragraph';
// import SpeechSetting from './setting/SpeechSetting';
import SingleMode from './setting/SingleMode';
import AnnoToggle from './setting/AnnoToggle';
import TransToggle from './setting/TransToggle';
import dynamic from 'next/dynamic';
const SpeechSetting = dynamic(() => import('./setting/SpeechSetting'), {
    ssr: false,
});
import {
    getNoteThunk,
    setNoteSettingCreator,
} from '../../lib/store/note/action';

export const useNote = () => {
    const { query } = useRouter();
    const { note_id } = query;
    const dispatch = useDispatch();
    const note = useSelector(state => state.note.note);
    useEffect(() => {
        if (!note?._id && note_id) dispatch(getNoteThunk(note_id));
    }, [note?._id, note_id]);
    return [note];
};

export const useSetting = () => {
    const dispatch = useDispatch();
    const setting = useSelector(state => state.note.setting);
    const dispatchSetting = settingObj => {
        dispatch(setNoteSettingCreator({ ...setting, ...settingObj }));
    };

    return [setting, dispatchSetting];
};

const Note = () => {
    const [note] = useNote();
    const [setting, dispatchSetting] = useSetting();

    const { _id, book, title, updatedAt, paragraphs } = note ?? {};
    const { single, annoOpen, paragIndex, transOpen } = setting;

    return (
        <Card>
            <CardHeader
                avatar={<Avatar alt={book} src='/xgn.jpeg' />}
                action={
                    <Box display='flex' alignItems='center'>
                        <Box>
                            <SingleMode
                                checked={single}
                                dispatchSetting={dispatchSetting}
                            />
                            <AnnoToggle
                                checked={annoOpen}
                                dispatchSetting={dispatchSetting}
                            />
                            <TransToggle
                                checked={transOpen}
                                dispatchSetting={dispatchSetting}
                            />
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <SpeechSetting />
                    </Box>
                }
                title={title}
                subheader={book}
            />
            <CardContent>
                {single && (
                    <Box display='flex' justifyContent='space-between' pb={2}>
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={() =>
                                dispatchSetting({ paragIndex: paragIndex - 1 })
                            }
                            disabled={paragIndex === 0}
                        >
                            <NavigateBeforeIcon />
                            上句
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={() =>
                                dispatchSetting({ paragIndex: paragIndex + 1 })
                            }
                            disabled={paragIndex === paragraphs?.length - 1}
                        >
                            下句
                            <NavigateNextIcon />
                        </Button>
                    </Box>
                )}
                {single ? (
                    <Paragraph
                        focused
                        paragraph={paragraphs[paragIndex ?? 0]}
                    />
                ) : (
                    paragraphs?.map((paragraph, i) => {
                        const focused = paragIndex === i;
                        return (
                            <Paragraph
                                key={paragraph?._id}
                                focused={focused}
                                paragraph={paragraph}
                            />
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
};
export default Note;
