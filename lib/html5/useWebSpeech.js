import { useState, useMemo, useEffect } from 'react';
import speak, { pause, resume } from './speak';

const useWebSpeech = () => {
    const [synth, setSynth] = useState(undefined);
    const [paused, setPaused] = useState(false);
    useEffect(() => {
        setSynth(window?.speechSynthesis);
    }, []);

    const [voice, setVoice] = useState(null);
    const [pitch, setPitch] = useState(1); // 0 - 2
    const [volume, setVolume] = useState(1); // 0 - 1
    const [rate, setRate] = useState(1); // 0.1 - 10

    const utterance = useMemo(
        () => (synth ? new SpeechSynthesisUtterance() : undefined),
        [synth]
    );

    useEffect(() => {
        if (utterance) {
            utterance.voice = voice;
            utterance.pitch = pitch;
            utterance.volume = volume;
            utterance.rate = rate;
        }
    }, [voice, pitch, volume, rate]);

    const voices = useMemo(
        () =>
            synth
                ? window.speechSynthesis
                      ?.getVoices()
                      .filter(v => /^en|^zh|^ja/i.test(v.lang))
                : [],
        [synth]
    );

    const pause = () => {
        synth?.pause();
        setPaused(true);
    };

    const play = (text = '') => {
        if (paused) {
            resume();
            setPaused(false);
            return;
        }
        if (utterance) {
            utterance.text = text;
            speak(utterance);
        }
    };

    return [
        paused,
        voices,
        play,
        pause,
        volume,
        setVolume,
        rate,
        setRate,
        pitch,
        setPitch,
        voice,
        setVoice,
    ];
};

export default useWebSpeech;
