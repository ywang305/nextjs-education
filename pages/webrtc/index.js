import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useMemo,
} from 'react';
import useVideo from 'react-use/lib/useVideo';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import firebase from '../../lib/firebase';
import 'firebase/firestore';

export function useStream(constraint = { video: true, audio: true }) {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(new MediaStream());

    useEffect(() => {
        async function enableStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(
                    constraint
                );
                setLocalStream(stream);
            } catch (err) {
                // Removed for brevity
            }
        }
        enableStream();
        return () => localStream?.getTracks().forEach(track => track.stop());
    }, [constraint]);

    return [localStream, remoteStream];
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
export function usePeerConnection() {
    const [localStream, remoteStream] = useStream();

    const peerConnection = useMemo(
        () => new RTCPeerConnection(configuration),
        []
    );

    useEffect(() => {
        localStream?.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });
    }, [localStream]);

    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        let roomRef;
        const createRoom = async () => {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            const db = firebase.firestore();
            roomRef = await db.collection('rooms').doc();
            const roomWithOffer = {
                offer: {
                    type: offer.type,
                    sdp: offer.sdp,
                },
            };
            await roomRef.set(roomWithOffer);

            // -- event 1: self ice candicate => firestore
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

            setRoomId(roomRef.id);
        };

        createRoom();

        return function cleanup() {
            (async () => {
                const calleeCandidates = await roomRef
                    ?.collection('calleeCandidates')
                    .get();
                calleeCandidates.forEach(async candidate => {
                    await candidate.ref.delete();
                });
                const callerCandidates = await roomRef
                    ?.collection('callerCandidates')
                    .get();
                callerCandidates.forEach(async candidate => {
                    await candidate.ref.delete();
                });
                await roomRef?.delete();
            })();
        };
    }, [peerConnection]);

    return [localStream, remoteStream, roomId];
}

const videoAttrs = {
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    autoPlay: true,
    playsInline: true,
    controls: true,
    width: '100%',
    height: '100%',
};

const Video = () => {
    const [video, state, controls, ref] = useVideo(videoAttrs);
    const [localStream, remoteStream, roomId] = usePeerConnection();
    if (ref.current) {
        ref.current.srcObject = localStream;
    }

    return (
        <div>
            <Box border={1} borderColor='secondary.main' p={1}>
                {video}
            </Box>
            <button onClick={controls.pause}>Pause</button>

            <Button
                onClick={async () => {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true,
                    });
                    if (ref.current) {
                        ref.current.srcObject = stream;
                    }
                }}
            >
                Create Room
            </Button>
        </div>
    );
};

const WebRtcPage = () => {
    return (
        <div>
            <Video />
        </div>
    );
};

export default WebRtcPage;
