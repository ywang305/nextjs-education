export default function speak(text = '') {
    if (window.speechSynthesis) {
        speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
}
