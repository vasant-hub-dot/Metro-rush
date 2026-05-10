let currentMusic;

export function playMusic(trackName) {

if(currentMusic) {

currentMusic.pause();

}

currentMusic = new Audio(
`assets/music/${trackName}.mp3`
);

currentMusic.loop = true;
currentMusic.volume = 0.5;

currentMusic.play();

}
