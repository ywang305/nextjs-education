import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import useVideo from 'react-use/lib/useVideo';
import Link from 'next/link';
import Route, { useRouter } from 'next/router';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import firebase from '../../../lib/firebase';
import 'firebase/firestore';
import { Typography, Fab } from '@material-ui/core';
import CallEndIcon from '@material-ui/icons/CallEnd';

export const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

async function createRoom(peerConnection, callerId) {
  const localStream = document.querySelector('#localVideo').srcObject;
  const remoteStream = document.querySelector('#remoteVideo').srcObject;

  const db = firebase.firestore();
  const roomRef = await db.collection('rooms').doc(callerId);

  localStream?.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  // Code for collecting ICE candidates below
  const callerCandidatesCollection = roomRef.collection('callerCandidates');

  peerConnection.addEventListener('icecandidate', (event) => {
    if (!event.candidate) {
      console.log('Got final candidate!');
      return;
    }
    console.log('Got candidate: ', event.candidate);
    callerCandidatesCollection.add(event.candidate.toJSON());
  });
  // Code for collecting ICE candidates above

  // Code for creating a room below
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  console.log('Created offer:', offer);

  const roomWithOffer = {
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  };
  await roomRef.set(roomWithOffer);
  // Code for creating a room above

  peerConnection.addEventListener('track', (event) => {
    console.log('Got remote track:', event.streams[0]);
    event.streams[0].getTracks().forEach((track) => {
      console.log('Add a track to the remoteStream:', track);
      remoteStream?.addTrack(track);
    });
  });

  // Listening for remote session description below
  roomRef.onSnapshot(async (snapshot) => {
    const data = snapshot.data();
    if (data && data.answer && !peerConnection.currentRemoteDescription) {
      console.log('Got remote anwser: ', data.answer);
      const rtcSessionDescription = new RTCSessionDescription(data.answer);
      await peerConnection.setRemoteDescription(rtcSessionDescription);
    }
  });
  // Listening for remote session description above

  // Listen for remote ICE candidates below
  roomRef.collection('calleeCandidates').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === 'added') {
        let data = change.doc.data();
        console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
        await peerConnection.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
  // Listen for remote ICE candidates above
}

export async function openUserMedia() {
  const localVideo = document.querySelector('#localVideo');
  const remoteVideo = document.querySelector('#remoteVideo');

  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  const remoteStream = new MediaStream();

  localVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;
}

export async function hangUp(peerConnection, callerId) {
  document
    .querySelector('#localVideo')
    .srcObject?.getTracks()
    .forEach((track) => {
      track.stop();
    });

  document
    .querySelector('#remoteVideo')
    .srcObject?.getTracks()
    .forEach((track) => {
      track.stop();
    });

  peerConnection?.close();

  document.querySelector('#localVideo').srcObject = null;
  document.querySelector('#remoteVideo').srcObject = null;

  // Delete room on hangup
  const db = firebase.firestore();
  const roomRef = await db.collection('rooms').doc(callerId);
  const calleeCandidates = await roomRef?.collection('calleeCandidates').get();
  calleeCandidates?.forEach(async (candidate) => {
    await candidate.ref.delete();
  });
  const callerCandidates = await roomRef?.collection('callerCandidates').get();
  callerCandidates?.forEach(async (candidate) => {
    await candidate.ref.delete();
  });
  await roomRef?.delete();
}

export const usePeerConn = () => {
  const { query } = useRouter();
  const { callerId } = query;

  const peerConnection = useMemo(
    () => new RTCPeerConnection(configuration),
    []
  );

  const clickHangUp = async (e) => {
    e.preventDefault();
    await hangUp(peerConnection, callerId);
    Route.back();
  };

  return [peerConnection, callerId, clickHangUp];
};

const useCreateRTC = () => {
  const [peerConnection, callerId, clickHangUp] = usePeerConn();

  useEffect(() => {
    if (callerId && peerConnection) {
      (async () => {
        await openUserMedia();
        await createRoom(peerConnection, callerId);
      })();

      return () => hangUp(peerConnection, callerId);
    }
  }, [callerId, peerConnection]);

  const isCaller = useMemo(() => true, []);

  return [callerId, clickHangUp, isCaller];
};

export default function Video({ useRTC = useCreateRTC }) {
  const [callerId, clickHangUp, isCaller] = useRTC();

  const { spacing } = useTheme();

  return (
    <div>
      <Box display='flex' justifyContent='center'>
        <Box position='relative'>
          <video
            id='localVideo'
            playsInline
            autoPlay
            style={{ maxHeight: '75vh', width: '100%' }}
          />

          <video
            id='remoteVideo'
            playsInline
            autoPlay
            style={{
              position: 'absolute',
              top: spacing(1),
              right: spacing(1),
              zIndex: 10,
              height: '20%',
              borderRadius: spacing(1),
            }}
          />
          <Box position='absolute' bottom={spacing(2)} left='50%' ml='-72px'>
            <Fab variant='extended' color='secondary' onClick={clickHangUp}>
              <CallEndIcon />
              <Box pl={1}>Hang Up</Box>
            </Fab>
          </Box>
        </Box>
      </Box>
      {Boolean(isCaller) && (
        <ul>
          <li>
            shared your caller ID <a href='#'>{callerId}</a>
          </li>
          <li>
            or shared this link: &nbsp;
            <a href='#'>{location.href.replace(/caller/, 'callee')}</a>
            &nbsp;to callee
          </li>
        </ul>
      )}
    </div>
  );
}
