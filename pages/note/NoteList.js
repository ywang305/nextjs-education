import React, { useState, useCallback, useEffect } from 'react';
import fetchAsync from '../../lib/fetchAsync';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import useKey from 'react-use/lib/useKey';
import ListSubheader from '@material-ui/core/ListSubheader';
import PlayIcon from '@material-ui/icons/PlayArrow';
import speak from '../../lib/html5/speak';
import DescriptionIcon from '@material-ui/icons/Description';
import ListItemText from '@material-ui/core/ListItemText';
import Router from 'next/router';

const NoteList = () => {
    const [list, setList] = useState([]);

    const getTitles = useCallback(async () => {
        const spellList = await fetchAsync('/api/note');
        setList(spellList);
    }, []);

    useEffect(() => {
        getTitles();
    }, []);

    return (
        <List
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
                <ListSubheader component='div' id='nested-list-subheader'>
                    新概念
                </ListSubheader>
            }
        >
            {list
                ?.filter(item => item._id && item.title)
                .map(item => {
                    const { _id, title, updatedAt } = item;
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
                                primary={title}
                                secondary={new Date(updatedAt).toLocaleString()}
                            />
                        </ListItem>
                    );
                })}
        </List>
    );
};

export default NoteList;
