import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useMemo,
} from 'react';
import useVideo from 'react-use/lib/useVideo';
import Link from 'next/link';
import Route, {useRouter} from 'next/router';
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
        return () => localStream?.getTracks().forEach(track => track.stop());
    }, [video, audio]);

    return [localStream];
}

const useRemoteStream = ()=>{
    const remoteStream = useMemo(()=>new MediaStream(), []);
    useEffect(()=>{
        return ()=>remoteStream.getTracks().forEach(track=>track.stop());
    }, []);
    return [remoteStream];
}

const configuration = {
    iceServers: [
        {
            urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};
export function usePeerConnection(callerId) {
    const [localStream] = useLocalStream();
    const [remoteStream] = useRemoteStream();
    

    const peerConnection = useMemo(
        () => new RTCPeerConnection(configuration),
        []
    );

    useEffect(() => {
        localStream?.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });
        return ()=>{
            localStream?.getTracks().forEach(track => track.stop());
        }
    }, [localStream, peerConnection]);

    useEffect(() => {
        let roomRef;
        const createRoom = async () => {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            const db = firebase.firestore();
            roomRef = await db.collection('rooms').doc(callerId);
            const roomWithOffer = {
                offer: {
                    type: offer.type,
                    sdp: offer.sdp,
                },
            };
            await roomRef.set(roomWithOffer);

            // -- event 1: self ice candicate => firestore, this happens after got the anwser
            const callerCandidatesCollection = roomRef.collection(
                'callerCandidates'
            );
            peerConnection.addEventListener('icecandidate', event => {
                if (!event.candidate) {
                    console.log('Got final candidate!');
                    return;
                }
                console.log('Got candidate: ', event.candidate);
                callerCandidatesCollection.add(event.candidate.toJSON());
            });

            // -- event 2: remote anwser description
            roomRef.onSnapshot(async snapshot => {
                const data = snapshot.data();
                if (
                    !peerConnection.currentRemoteDescription &&
                    data &&
                    data.answer
                ) {
                    const rtcSessionDescription = new RTCSessionDescription(
                        data.answer
                    );
                    await peerConnection.setRemoteDescription(
                        rtcSessionDescription
                    );
                }
            });

            // -- event 3: parsed remote track, after parsing remote answer discrition
            peerConnection.addEventListener('track', event => {
                event.streams[0].getTracks().forEach(track => {
                    //   console.log('Add a track to the remoteStream:', track);
                    remoteStream?.addTrack(track);
                });
            });

            // -- event 4: remote ice candidates from firestore, after callee put its on firestore
            roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(async change => {
                    if (change.type === 'added') {
                        let data = change.doc.data();
                        // console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
                        await peerConnection.addIceCandidate(
                            new RTCIceCandidate(data)
                        );
                    }
                });
            });
        };

        if(callerId) {
            createRoom();
        }
        

        return async function cleanupFirestore() {
            const calleeCandidates = await roomRef
                ?.collection('calleeCandidates')
                .get();
            calleeCandidates?.forEach(async candidate => {
                await candidate.ref.delete();
            });
            const callerCandidates = await roomRef
                ?.collection('callerCandidates')
                .get();
            callerCandidates?.forEach(async candidate => {
                await candidate.ref.delete();
            });
            await roomRef?.delete();
        };
    }, [peerConnection, callerId]);

    const hangupHandler = async ()=>{
        
        localStream?.getTracks().forEach(track => track.stop());
        remoteStream?.getTracks().forEach(track => track.stop());

        const db = firebase.firestore();
        const roomRef = await db.collection('rooms').doc(callerId);
        const calleeCandidates = await roomRef
                ?.collection('calleeCandidates')
                .get();
        calleeCandidates?.forEach(async candidate => {
            await candidate.ref.delete();
        });
        const callerCandidates = await roomRef
            ?.collection('callerCandidates')
            .get();
        callerCandidates?.forEach(async candidate => {
            await candidate.ref.delete();
        });
        await roomRef?.delete();

        Route.back();
    }

    return [localStream, remoteStream, hangupHandler];
}

const videoAttrs = {
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    autoPlay: true,
    playsInline: true,
    controls: false,
    width: '100%',
    height: '100%',
};

export default function Caller() {
    const {query} = useRouter();
    const {callerId} = query;

    const [video, state, controls, ref] = useVideo(videoAttrs);
    const [localStream, remoteStream, hangupHandler] = usePeerConnection(callerId);
    if (ref.current && !ref.current.srcObject) {
        ref.current.srcObject = localStream;
    }

    return (
        <div>
            <Box border={1} borderColor='secondary.main' p={1}>
                {video}
            </Box>
 
                <Fab variant="extended" color='secondary' onClick={hangupHandler}>
                    <CallEndIcon />
                    <Box pl={1}>
                        Hang Up
                    </Box>
                </Fab>

            <Typography >
                shared this link: 
                <Box mx={1} component='span' color='info.main'>{location.href.replace(/caller/, 'callee')}</Box> 
                to the other user 
            </Typography>
            
        </div>
    );
};