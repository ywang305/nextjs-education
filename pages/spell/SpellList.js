import React, { useState, useCallback, useEffect } from 'react';
import fetchAsync from '../../lib/fetchAsync';
import SpellItem from './SpellItem';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import useKey from 'react-use/lib/useKey';
import ListSubheader from '@material-ui/core/ListSubheader';
import PlayIcon from '@material-ui/icons/PlayArrow';

const SpellList = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const tid = setTimeout(async function getAll() {
            const spellList = await fetchAsync('/api/spell');
            setList(spellList);
        }, 5000);
        return () => clearTimeout(tid);
    }, [list]);

    const [activeItem, setActiveItem] = useState(list.length);
    useKey('ArrowDown', () => {
        setActiveItem(i => (i + 1) % list.length);
    });
    useKey('ArrowUp', () => {
        setActiveItem(i => Math.max(0, i - 1));
    });

    return (
        <List
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
                <ListSubheader component='div' id='nested-list-subheader'>
                    Spell Words List
                </ListSubheader>
            }
        >
            {list.map((spellItem, i) => {
                const isActive = activeItem === i;
                return (
                    <ListItem
                        button
                        onClick={() => setActiveItem(i)}
                        key={spellItem._id}
                    >
                        <ListItemIcon>
                            <PlayIcon
                                color={isActive ? 'primary' : 'diabled'}
                            />
                        </ListItemIcon>
                        <Box
                            p={1}
                            fontSize='h6.fontSize'
                            fontFamily='Comic Sans MS'
                            color={!isActive && 'text.disabled'}
                        >
                            {isActive ? (
                                <SpellItem words={spellItem.words} />
                            ) : (
                                spellItem.words
                            )}
                            <Divider />
                        </Box>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default SpellList;
