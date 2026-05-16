import { createPlayer, movePlayer } from './player.js';

import { spawnObstacle, updateObstacles } from './obstacle.js';

import { spawnCoin, updateCoins } from './coins.js';

import { playMusic } from './audio.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
antialias: true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(
renderer.domElement
);

const light =
new THREE.DirectionalLight(
0xffffff,
1
);

light.position.set(0,10,10);

scene.add(light);

const roadGeometry =
new THREE.BoxGeometry(
10,
1,
200
);

const roadMaterial =
new THREE.MeshStandardMaterial({

color: 0x222222

});

const road =
new THREE.Mesh(
roadGeometry,
roadMaterial
);

road.position.y = -1;

scene.add(road);

const player = createPlayer();

scene.add(player);

camera.position.set(0,5,10);

let score = 0;

let level = 1;

let speed = 0.5;

const coinCounter = {
count: 0
};

setInterval(()=>{

spawnObstacle(scene);

},1500);

setInterval(()=>{

spawnCoin(scene);

},1200);

const snowGeometry =
new THREE.BufferGeometry();

const snowCount = 1000;

const snowPositions = [];

for(let i=0; i<snowCount; i++) {

snowPositions.push(
(Math.random()-0.5)*100
);

snowPositions.push(
Math.random()*50
);

snowPositions.push(
(Math.random()-0.5)*100
);

}

snowGeometry.setAttribute(
'position',
new THREE.Float32BufferAttribute(
snowPositions,
3
)
);

const snowMaterial =
new THREE.PointsMaterial({

color: 0xffffff,
size: 0.2

});

const snow =
new THREE.Points(
snowGeometry,
snowMaterial
);

scene.add(snow);

const chaserGeometry =
new THREE.BoxGeometry(1,2,1);

const chaserMaterial =
new THREE.MeshStandardMaterial({

color: 0xff0000

});

const chaser =
new THREE.Mesh(
chaserGeometry,
chaserMaterial
);

chaser.position.set(0,1,8);

scene.add(chaser);

const planeGeometry =
new THREE.BoxGeometry(6,1,3);

const planeMaterial =
new THREE.MeshStandardMaterial({

color: 0xffffff

});

const plane =
new THREE.Mesh(
planeGeometry,
planeMaterial
);

plane.position.set(0,20,-50);

scene.add(plane);

function animate() {

requestAnimationFrame(animate);

movePlayer(player);

updateObstacles(
scene,
player,
speed
);

updateCoins(
scene,
player,
speed,
coinCounter
);

score++;

level = Math.floor(score / 500) + 1;

speed += 0.00003;

document.getElementById('score').innerText =
'Score: ' + score;

document.getElementById('coins').innerText =
'Coins: ' + coinCounter.count;

document.getElementById('level').innerText =
'Level: ' + level;

if(level >= 10) {

scene.background =
new THREE.Color(0x000033);

road.material.color.set(0x111144);

}

if(level >= 20) {

scene.background =
new THREE.Color(0x220022);

road.material.color.set(0x330033);

}

if(level >= 30) {

scene.background =
new THREE.Color(0x330000);

road.material.color.set(0x551111);

}

if(level >= 36) {

scene.background =
new THREE.Color(0xbbddff);

road.material.color.set(0xffffff);

}

chaser.position.x =
player.position.x;

plane.position.x += 0.05;

renderer.render(scene,camera);

}

document
.getElementById('startButton')
.addEventListener('click',()=>{

const selectedMusic =
document.getElementById(
'musicSelect'
).value;

playMusic(selectedMusic);

document.getElementById(
'menu'
).style.display = 'none';

animate();

});
