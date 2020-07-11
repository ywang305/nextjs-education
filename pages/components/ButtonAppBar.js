import React, { useMemo, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import VideocamIcon from '@material-ui/icons/Videocam';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import {
  Divider,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import useDevice from '../../lib/store/device/useDevice';

const useUserId = () => {
  const userId = useSelector((state) => state.login.userId);
  return [userId];
};

const Links = ({ iScope = 'web' }) => {
  const links = useMemo(
    () => [
      {
        name: 'Web-RTC',
        link: '/webrtc',
        Icon: VideocamIcon,
        scope: 'web,mobile',
      },
      {
        name: 'E-Learn',
        link: '/e-learn-facade',
        Icon: MenuBookIcon,
        scope: 'web,mobile',
      },
      {
        name: 'Login',
        link: '/login',
        Icon: PersonOutlineIcon,
        scope: 'web,mobile',
      },
    ],
    []
  );
  const [userId] = useUserId();
  return (
    <>
      {links
        .filter(({ scope }) => scope.includes(iScope))
        .map(({ Icon, name, link }) => {
          if (/^login$/gi.test(name) && userId) {
            name = userId;
            link += '/profile';
            Icon = AccountCircleIcon;
          }
          return iScope === 'web' ? (
            <Box pl={1} key={name}>
              <Link href={link}>
                <Button color='inherit'>{name}</Button>
              </Link>
            </Box>
          ) : (
            <Box minWidth={240}>
              <Link href={link}>
                <ListItem button key={name}>
                  <ListItemIcon>
                    <Icon color='primary' />
                  </ListItemIcon>

                  <ListItemText primary={name} />
                </ListItem>
              </Link>
              <Divider />
            </Box>
          );
        })}
    </>
  );
};

const useWinLayout = () => {
  useDevice();
  const isCompact = useSelector((state) => state.device.window.isCompact);
  return [isCompact];
};

const useDrawer = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback((event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen((o) => !o);
  }, []);

  return [open, toggleDrawer];
};

export function ButtonAppBar() {
  const [isCompact] = useWinLayout();
  const [open, toggleDrawer] = useDrawer();

  const brand = /manfen/gi.test(location.hostname) ? 'Manfen-Tech' : 'JuJu Edu';

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Box ml={2}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Link href='/' replace>
            <Typography
              variant='h6'
              style={{ cursor: 'pointer', marginLeft: 16 }}
            >
              {brand}
            </Typography>
          </Link>
          <Box style={{ flexGrow: 1 }} />
          {!isCompact && <Links iScope='web' />}
        </Toolbar>
      </AppBar>

      <Drawer anchor='left' open={open} onClose={toggleDrawer}>
        <Box
          bgcolor='primary.main'
          color='info.contrastText'
          p={2}
          display='flex'
          alignItems='center'
        >
          <Avatar alt='HadesFlower' src='/logo.jpg' />
          <Box ml={1}>
            <Typography variant='h6'>{brand}</Typography>
          </Box>
        </Box>

        <List onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          <Links iScope='mobile' />
        </List>
      </Drawer>
    </>
  );
}

export default ButtonAppBar;
