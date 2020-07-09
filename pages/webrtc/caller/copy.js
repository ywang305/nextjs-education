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
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import firebase from '../../../lib/firebase';
import 'firebase/firestore';
import { Typography, Fab } from '@material-ui/core';
import CallEndIcon from '@material-ui/icons/CallEnd';

export function useLocalStream(video = true, audio = true) {
  const [localStream, setLocalStream] = useState(null);
  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video,
          audio,
        });
        setLocalStream(stream);
      } catch (err) {
        // Removed for brevity
      }
    }
    enableStream();
    return () => localStream?.getTracks().forEach((track) => track.stop());
  }, [video, audio]);

  return [localStream];
}

export const useRemoteStream = () => {
  const remoteStream = useMemo(() => new MediaStream(), []);
  useEffect(() => {
    return () => remoteStream.getTracks().forEach((track) => track.stop());
  }, []);
  return [remoteStream];
};

export const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

// offer/answer, ICE candidates for both for caller
const createRoom = async (roomRef, peerConnection) => {
  // -- event 2: self ice candicate => firestore, this happens after got the anwser
  const callerCandidatesCollection = roomRef.collection('callerCandidates');
  peerConnection.addEventListener('icecandidate', (event) => {
    if (!event.candidate) {
      console.log('Got final candidate!');
      return;
    }
    console.log('Got candidate: ', event.candidate);
    callerCandidatesCollection.add(event.candidate.toJSON()); // will trigger add event
  });

  // 1. setLocalDiscription => event2 "icecandidate"
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  const roomWithOffer = {
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  };
  await roomRef.set(roomWithOffer);

  // -- event 3: remote anwser description
  roomRef.onSnapshot(async (snapshot) => {
    const data = snapshot.data();
    if (!peerConnection.currentRemoteDescription && data && data.answer) {
      const rtcSessionDescription = new RTCSessionDescription(data.answer);
      await peerConnection.setRemoteDescription(rtcSessionDescription);
    }
  });

  // -- event 4: remote ice candidates from firestore, after callee put its on firestore
  roomRef.collection('calleeCandidates').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === 'added') {
        let data = change.doc.data();
        // console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
        await peerConnection.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
};

export function usePeerConnection(callerId, peerConnCallback) {
  const [localStream] = useLocalStream();
  const [remoteStream] = useRemoteStream();

  const peerConnection = useMemo(
    () => new RTCPeerConnection(configuration),
    []
  );

  useEffect(() => {
    localStream?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
    };
  }, [localStream, peerConnection]);

  useEffect(() => {
    peerConnection.addEventListener('track', (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream?.addTrack(track);
      });
    });
    return () => {
      remoteStream?.getTracks().forEach((track) => track.stop());
    };
  }, [remoteStream, peerConnection]);

  useEffect(() => {
    let roomRef;
    if (callerId) {
      const db = firebase.firestore();
      roomRef = db.collection('rooms').doc(callerId);

      peerConnCallback(roomRef, peerConnection);
    }

    return async function cleanupFirestore() {
      const calleeCandidates = await roomRef
        ?.collection('calleeCandidates')
        .get();
      calleeCandidates?.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      const callerCandidates = await roomRef
        ?.collection('callerCandidates')
        .get();
      callerCandidates?.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      await roomRef?.delete();
    };
  }, [peerConnection, callerId]);

  const hangupHandler = async () => {
    localStream?.getTracks().forEach((track) => track.stop());
    remoteStream?.getTracks().forEach((track) => track.stop());

    const db = firebase.firestore();
    const roomRef = await db.collection('rooms').doc(callerId);
    const calleeCandidates = await roomRef
      ?.collection('calleeCandidates')
      .get();
    calleeCandidates?.forEach(async (candidate) => {
      await candidate.ref.delete();
    });
    const callerCandidates = await roomRef
      ?.collection('callerCandidates')
      .get();
    callerCandidates?.forEach(async (candidate) => {
      await candidate.ref.delete();
    });
    await roomRef?.delete();

    Route.back();
  };

  return [localStream, remoteStream, hangupHandler];
}

const videoAttrs = {
  // src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  autoPlay: true,
  playsInline: true,
  controls: false,
  width: '100%',
  height: '100%',
};

export default function Video({ peerConnCallback = createRoom }) {
  const { query } = useRouter();
  const { callerId } = query;

  const [video1, state1, controls1, ref1] = useVideo(videoAttrs);
  const [video2, state2, controls2, ref2] = useVideo(videoAttrs);
  const [localStream, remoteStream, hangupHandler] = usePeerConnection(
    callerId,
    peerConnCallback
  );
  if (ref1.current && !ref1.current.srcObject) {
    ref1.current.srcObject = localStream;
  }
  if (ref2.current && !ref2.current.srcObject) {
    ref2.current.srcObject = remoteStream;
  }

  return (
    <div>
      <Box position='relative'>
        <Box>{video1}</Box>
        <Box
          position='absolute'
          top={2}
          right={2}
          height={0.2}
          width={0.2}
          zIndex='speedDial'
        >
          {video2}
        </Box>
      </Box>

      <Fab variant='extended' color='secondary' onClick={hangupHandler}>
        <CallEndIcon />
        <Box pl={1}>Hang Up</Box>
      </Fab>

      <Typography>
        <Box mr={1} component='span' color='info.main'>
          {callerId}
        </Box>
        is your caller ID.
        <br />
        shared this link:
        <Box mx={1} component='span' color='info.main'>
          {location.href.replace(/caller/, 'callee')}
        </Box>
        to the other user
      </Typography>
    </div>
  );
}
