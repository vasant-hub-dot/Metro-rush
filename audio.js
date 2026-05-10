let audioContext;

export function playMusic(trackName) {

audioContext =
new (window.AudioContext ||
window.webkitAudioContext)();

const oscillator =
audioContext.createOscillator();

const gainNode =
audioContext.createGain();

oscillator.connect(gainNode);

gainNode.connect(audioContext.destination);

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

oscillator.type = 'sine';

gainNode.gain.value = 0.03;

oscillator.start();

}
