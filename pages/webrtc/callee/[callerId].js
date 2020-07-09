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
import Video, {
  configuration,
  openUserMedia,
  hangUp,
  usePeerConn,
} from '../caller/[callerId]';

const joinRoom = async (peerConnection, callerId) => {
  const db = firebase.firestore();
  const roomRef = await db.collection('rooms').doc(callerId);
  const roomSnapshot = await roomRef.get();

  if (roomSnapshot.exists) {
    const localStream = document.querySelector('#localVideo').srcObject;
    const remoteStream = document.querySelector('#remoteVideo').srcObject;

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // Code for collecting ICE candidates below
    const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
    peerConnection.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      console.log('Got candidate: ', event.candidate);
      calleeCandidatesCollection.add(event.candidate.toJSON());
    });
    // Code for collecting ICE candidates above

    peerConnection.addEventListener('track', (event) => {
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        console.log('Add a track to the remoteStream:', track);
        remoteStream.addTrack(track);
      });
    });

    // Code for creating SDP answer below
    const offer = roomSnapshot.data().offer;
    console.log('Got offer:', offer);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    console.log('Created answer:', answer);
    await peerConnection.setLocalDescription(answer);

    const roomWithAnswer = {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    };
    await roomRef.update(roomWithAnswer);
    // Code for creating SDP answer above

    // Listening for remote ICE candidates below
    roomRef.collection('callerCandidates').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  }
};

const useJoinRTC = () => {
  const [peerConnection, callerId, clickHangUp] = usePeerConn();

  useEffect(() => {
    if (callerId && peerConnection) {
      (async () => {
        await openUserMedia();
        await joinRoom(peerConnection, callerId);
      })();

      return () => hangUp(peerConnection, callerId);
    }
  }, [callerId, peerConnection]);

  return [callerId, clickHangUp];
};

export default function VideoWrapper() {
  return <Video useRTC={useJoinRTC} />;
}
