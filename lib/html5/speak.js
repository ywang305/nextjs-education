export default function speak(text, option) {
    const synth = window?.speechSynthesis;
    if (synth) {
        const utter = new SpeechSynthesisUtterance(text);
        if (option) {
            utter.rate = option.rate ?? 1;
            utter.voice = option.voice ?? null;
        }
        synth.speak(utter);
    }
}

export function pause() {
    const synth = window?.speechSynthesis;
    if (synth) {
        synth.pause();
    }
}

export function resume() {
    const synth = window?.speechSynthesis;
    if (synth) {
        synth.resume();
    }
}
