import { createPlayer, movePlayer }
from './player.js';

import { spawnObstacle, updateObstacles }
from './obstacle.js';

import { spawnCoin, updateCoins }
from './coins.js';

import { createBoss, updateBoss }
from './boss.js';

import { playMusic }
from './audio.js';

import { updateHUD, showVictory }
from './ui.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

scene.fog = new THREE.Fog(0x000000,10,120);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
antialias: true
});

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,10,10);
scene.add(light);

const blueLight = new THREE.PointLight(0x00ffff,5,50);
blueLight.position.set(5,10,5);
scene.add(blueLight);

const pinkLight = new THREE.PointLight(0xff00ff,5,50);
pinkLight.position.set(-5,10,5);
scene.add(pinkLight);

const roadGeometry = new THREE.BoxGeometry(10,1,200);

const roadMaterial =
new THREE.MeshStandardMaterial({
color: 0x111111
});

const road = new THREE.Mesh(
roadGeometry,
roadMaterial
);

road.position.y = -1;

scene.add(road);

const player = createPlayer();
scene.add(player);

camera.position.set(0,5,10);

let score = 0;
let speed = 0.5;
let level = 1;

const coinCounter = {
count: 0
};

setInterval(()=>{
spawnObstacle(scene);
},1500);

setInterval(()=>{
spawnCoin(scene);
},1200);

createBoss(scene);

function updateTheme() {

if(level >= 10) {
scene.background = new THREE.Color(0x000033);
}

if(level >= 20) {
scene.background = new THREE.Color(0x111111);
}

if(level >= 30) {
scene.background = new THREE.Color(0x220000);
}

if(level >= 36) {
scene.background = new THREE.Color(0x888888);
}

}

function animate() {

requestAnimationFrame(animate);

movePlayer(player);

updateObstacles(scene,player,speed);

updateCoins(scene,player,speed,coinCounter);

updateBoss(speed);

speed += 0.00003;

score++;

level = Math.min(40,
Math.floor(score / 500) + 1);

updateTheme();

updateHUD(score,level,coinCounter.count);

if(level >= 40) {
showVictory();
}

renderer.render(scene,camera);

}

animate();

document.getElementById('startButton')
.addEventListener('click',()=>{

const selectedMusic =
document.getElementById('musicSelect').value;

playMusic(selectedMusic);

document.getElementById('menu').style.display =
'none';

});
