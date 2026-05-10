


import { createPlayer, movePlayer } from './player.js';
import { spawnObstacle, updateObstacles } from './obstacle.js';
import { spawnCoin, updateCoins } from './coins.js';

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

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff,1);

light.position.set(0,10,10);

scene.add(light);

const roadGeometry = new THREE.BoxGeometry(10,1,200);

const roadMaterial = new THREE.MeshStandardMaterial({
color: 0x222222
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

function animate() {

requestAnimationFrame(animate);

movePlayer(player);

updateObstacles(scene,player,speed);

updateCoins(
scene,
player,
speed,
coinCounter
);

score++;

level = Math.floor(score / 500) + 1;

document.getElementById('score').innerText =
'Score: ' + score;

document.getElementById('coins').innerText =
'Coins: ' + coinCounter.count;

document.getElementById('level').innerText =
'Level: ' + level;

renderer.render(scene,camera);

}

document
.getElementById('startButton')
.addEventListener('click',()=>{

document.getElementById('menu').style.display =
'none';

animate();

});
