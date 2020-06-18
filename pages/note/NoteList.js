import React, { useState, useCallback, useEffect } from 'react';
import fetchAsync from '../../lib/fetchAsync';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import DescriptionIcon from '@material-ui/icons/Description';
import ListItemText from '@material-ui/core/ListItemText';
import Router from 'next/router';

const NoteList = () => {
    const [list, setList] = useState([]);

    const getTitles = useCallback(async () => {
        const noteList = await fetchAsync('/api/note');
        setList(noteList);
    }, []);

    useEffect(() => {
        getTitles();
    }, []);

    return (
        <List
            aria-labelledby='nested-list-subheader'
            subheader={
                <ListSubheader component='div' id='nested-list-subheader'>
                    英语笔记
                </ListSubheader>
            }
        >
            {list
                ?.filter(item => item._id && item.title)
                .map(item => {
                    const { _id, book, title, updatedAt } = item;
                    return (
                        <ListItem
                            button
                            key={_id}
                            onClick={() => {
                                Router.push(`/note/${_id}`);
                            }}
                        >
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={`${book ? book + ',  ' : ''}${title}`}
                                secondary={new Date(updatedAt).toLocaleString()}
                            />
                        </ListItem>
                    );
                })}
        </List>
    );
};

export default NoteList;
