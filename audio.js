let audioContext;
let oscillator;

export function playMusic(trackName) {

audioContext =
new (
window.AudioContext ||
window.webkitAudioContext
)();

oscillator =
audioContext.createOscillator();

const gainNode =
audioContext.createGain();

oscillator.connect(gainNode);

gainNode.connect(
audioContext.destination
);

oscillator.type = 'sine';

if(trackName === 'dandelion') {

oscillator.frequency.value = 220;

}

if(trackName === 'sodapop') {

oscillator.frequency.value = 300;

}

if(trackName === 'nightchanges') {

oscillator.frequency.value = 180;

}

if(trackName === 'carolofthebells') {

oscillator.frequency.value = 400;

}

gainNode.gain.value = 0.05;

oscillator.start();

}
