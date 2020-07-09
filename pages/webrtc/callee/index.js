import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import Route, { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import firebase from '../../../lib/firebase';
import 'firebase/firestore';
import { TextField } from '@material-ui/core';

const JoinMeeting = () => {
  const { pathname } = useRouter();

  const [errMsg, setErrMsg] = useState('');
  const [callerId, setCallerId] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(callerId);
    const roomSnapshot = await roomRef.get();
    if (!roomSnapshot.exists) {
      setErrMsg('cannot find this callerID');
      return;
    }

    Route.push(pathname + '/' + callerId);
  };

  return (
    <Box
      component='form'
      onSubmit={submitHandler}
      pt={16}
      display='flex'
      flexWrap='wrap'
      alignItems='center'
      justifyContent='center'
    >
      <Box m={1}>
        <TextField
          label='Input caller ID'
          value={callerId}
          onChange={(e) => {
            setCallerId(e.target.value);
            if (errMsg) setErrMsg('');
          }}
          error={Boolean(errMsg)}
          helperText={errMsg}
        />
      </Box>
      <Box m={1}>
        <Button type='submit' variant='outlined' color='primary'>
          Join Meeting
        </Button>
      </Box>
    </Box>
  );
};

export default JoinMeeting;
