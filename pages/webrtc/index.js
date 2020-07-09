import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { hri } from 'human-readable-ids';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import firebase from '../../lib/firebase';
import 'firebase/firestore';

const WebRtcPage = () => {
  const { pathname } = useRouter();
  const userId = useSelector((state) => state.login.userId) || hri.random();

  const { spacing } = useTheme();

  return (
    <Box display='flex' justifyContent='center' flexWrap='wrap' pt={spacing(2)}>
      <Box m={spacing(1)}>
        <Link href={pathname + '/caller/' + userId}>
          <Button variant='outlined' color='primary'>
            Creat Meeting
          </Button>
        </Link>
      </Box>
      <Box m={spacing(1)}>
        <Link href={pathname + '/callee'}>
          <Button variant='outlined' color='primary'>
            Join Meeting
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default WebRtcPage;
