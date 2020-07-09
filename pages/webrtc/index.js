import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
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

  return (
    <Box>
      <Link href={pathname + '/caller/' + userId}>
        <Button variant='contained' color='primary'>
          Creat Meeting
        </Button>
      </Link>
      <Link href={pathname + '/callee'}>
        <Button variant='contained' color='primary'>
          Join Meeting
        </Button>
      </Link>
    </Box>
  );
};

export default WebRtcPage;
