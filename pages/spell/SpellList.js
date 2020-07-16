import React, { useState, useCallback, useMemo, useEffect } from 'react';
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
import speak from '../../lib/html5/speak';
import IconButton from '@material-ui/core/IconButton';
import * as signalR from '@microsoft/signalr';

const useAzureSignalR = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://nyc-function.azurewebsites.net/api')
      .build();
    async function start() {
      try {
        await connection.start();

        connection.on('newMessage', (data) => {
          setList((items) => [data, ...items]);
        });

        connection.onclose(async () => {
          await start();
        });
      } catch (err) {
        setTimeout(() => start(), 5000);
      }
    }
    start();

    return async () => await connection.stop();
  }, []);

  return [list];
};

const SpellList = () => {
  //   const [list, setList] = useState([]);

  // useEffect(() => {
  //     const tid = setTimeout(async function getAll() {
  //         const spellList = await fetchAsync('/api/spell');
  //         setList(spellList);
  //     }, 5000);
  //     return () => clearTimeout(tid);
  // }, [list]);

  const [list] = useAzureSignalR();

  const [activeItem, setActiveItem] = useState(0);
  useKey('ArrowDown', () => {
    if (list?.length) {
      setActiveItem((i) => (i + 1) % list.length);
    }
  });
  useKey('ArrowUp', () => {
    setActiveItem((i) => Math.max(0, i - 1));
  });

  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Spell Words List Utterance. &nbsp;&nbsp; ↑ / ↓ row. &nbsp; ← / →
          letter. &nbsp; ▶ play sentence
        </ListSubheader>
      }
    >
      {list
        ?.filter((item) => item.words)
        .map((spellItem, i) => {
          const isActive = activeItem === i;
          return (
            <ListItem onClick={() => setActiveItem(i)} key={spellItem._id}>
              <ListItemIcon>
                <IconButton onClick={() => speak(spellItem.words)}>
                  <PlayIcon color={isActive ? 'primary' : 'diabled'} />
                </IconButton>
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
