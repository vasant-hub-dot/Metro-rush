import { createPlayer, movePlayer } from './player.js';
import { spawnObstacle, updateObstacles } from './obstacle.js';
import { spawnCoin, updateCoins } from './coins.js';

const scene = new THREE.Scene();

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





/* =========================
   LIGHTS
========================= */

const light = new THREE.DirectionalLight(0xffffff,1);

light.position.set(0,20,10);

scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff,0.7);

scene.add(ambient);





/* =========================
   ROAD
========================= */

const roadGeometry = new THREE.BoxGeometry(12,1,300);

const roadMaterial = new THREE.MeshStandardMaterial({
color: 0x444444
});

const road = new THREE.Mesh(
roadGeometry,
roadMaterial
);

road.position.y = -1;

scene.add(road);





/* =========================
   PLAYER
========================= */

const player = createPlayer();

scene.add(player);

camera.position.set(0,6,12);





/* =========================
   SCORE
========================= */

let score = 0;

let level = 1;

let speed = 0.6;

const coinCounter = {
count: 0
};





/* =========================
   CHASER
========================= */

const chaserGroup = new THREE.Group();

const chaserBody = new THREE.Mesh(

new THREE.BoxGeometry(1.2,2,1),

new THREE.MeshStandardMaterial({
color: 0xff0000
})

);

chaserBody.position.y = 1.5;

const chaserHead = new THREE.Mesh(

new THREE.SphereGeometry(0.5,32,32),

new THREE.MeshStandardMaterial({
color: 0xffcc99
})

);

chaserHead.position.y = 3;

const chaserEye1 = new THREE.Mesh(

new THREE.SphereGeometry(0.08,16,16),

new THREE.MeshBasicMaterial({
color: 0xffffff
})

);

chaserEye1.position.set(-0.15,3.1,0.45);

const chaserEye2 = new THREE.Mesh(

new THREE.SphereGeometry(0.08,16,16),

new THREE.MeshBasicMaterial({
color: 0xffffff
})

);

chaserEye2.position.set(0.15,3.1,0.45);

chaserGroup.add(chaserBody);

chaserGroup.add(chaserHead);

chaserGroup.add(chaserEye1);

chaserGroup.add(chaserEye2);

chaserGroup.position.set(0,0,18);

scene.add(chaserGroup);





/* =========================
   HOVERBOARD
========================= */

const hoverboard = new THREE.Mesh(

new THREE.BoxGeometry(1.5,0.2,3),

new THREE.MeshStandardMaterial({
color: 0xff00ff,
emissive: 0xaa00aa
})

);

hoverboard.position.y = 0.1;

player.add(hoverboard);





/* =========================
   PLANES
========================= */

const planes = [];

function createPlane() {

const plane = new THREE.Mesh(

new THREE.BoxGeometry(3,0.5,2),

new THREE.MeshStandardMaterial({
color: 0xffffff
})

);

plane.position.set(
(Math.random()-0.5)*40,
15 + Math.random()*10,
-100
);

scene.add(plane);

planes.push(plane);

}

setInterval(()=>{

createPlane();

},6000);





/* =========================
   BILLBOARDS
========================= */

const boards = [];

function createBoard() {

const board = new THREE.Mesh(

new THREE.BoxGeometry(5,3,0.5),

new THREE.MeshStandardMaterial({
color: 0xffff00
})

);

board.position.set(
Math.random() > 0.5 ? 10 : -10,
3,
-100
);

scene.add(board);

boards.push(board);

}

setInterval(()=>{

createBoard();

},4000);





/* =========================
   SNOW
========================= */

const snow = [];

function createSnow() {

for(let i=0;i<250;i++) {

const particle = new THREE.Mesh(

new THREE.SphereGeometry(0.05,8,8),

new THREE.MeshBasicMaterial({
color: 0xffffff
})

);

particle.position.set(
(Math.random()-0.5)*50,
Math.random()*20,
(Math.random()-0.5)*100
);

scene.add(particle);

snow.push(particle);

}

}

createSnow();





/* =========================
   RAIN
========================= */

const rain = [];

function createRain() {

for(let i=0;i<300;i++) {

const drop = new THREE.Mesh(

new THREE.BoxGeometry(0.03,0.5,0.03),

new THREE.MeshBasicMaterial({
color: 0x66ccff
})

);

drop.position.set(
(Math.random()-0.5)*50,
Math.random()*20,
(Math.random()-0.5)*100
);

scene.add(drop);

rain.push(drop);

}

}

createRain();





/* =========================
   SPAWNERS
========================= */

setInterval(()=>{

spawnObstacle(scene);

},1200);

setInterval(()=>{

spawnCoin(scene);

},1000);





/* =========================
   THEMES
========================= */

function updateTheme(level) {

if(level < 10) {

scene.background = new THREE.Color(0x87ceeb);

road.material.color.set(0x444444);

light.intensity = 1.2;

ambient.intensity = 0.8;

}

else if(level < 20) {

scene.background = new THREE.Color(0x001133);

road.material.color.set(0x223388);

light.intensity = 0.4;

ambient.intensity = 0.3;

}

else if(level < 30) {

scene.background = new THREE.Color(0xe6f7ff);

road.material.color.set(0xdddddd);

light.intensity = 1;

ambient.intensity = 0.9;

}

else {

scene.background = new THREE.Color(0x220000);

road.material.color.set(0x552222);

light.intensity = 0.2;

ambient.intensity = 0.15;

}

}





/* =========================
   ANIMATION
========================= */

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





/* =========================
   CHASER MOVEMENT
========================= */

chaserGroup.position.x =
player.position.x;

chaserGroup.position.z =
player.position.z + 18;





/* =========================
   PLANES
========================= */

planes.forEach((plane,index)=>{

plane.position.z += 1;

if(plane.position.z > 30) {

scene.remove(plane);

planes.splice(index,1);

}

});





/* =========================
   BILLBOARDS
========================= */

boards.forEach((board,index)=>{

board.position.z += speed;

if(board.position.z > 20) {

scene.remove(board);

boards.splice(index,1);

}

});





/* =========================
   SNOW
========================= */

snow.forEach(p=>{

if(level >= 20 && level < 30) {

p.visible = true;

p.position.y -= 0.1;

if(p.position.y < 0) {

p.position.y = 20;

}

}

else {

p.visible = false;

}

});





/* =========================
   RAIN
========================= */

rain.forEach(r=>{

if(level >= 10 && level < 20) {

r.visible = true;

r.position.y -= 0.5;

if(r.position.y < 0) {

r.position.y = 20;

}

}

else {

r.visible = false;

}

});





score++;

level = Math.floor(score / 500) + 1;

speed = 0.6 + level * 0.03;

updateTheme(level);





document.getElementById('score').innerText =
'Score: ' + score;

document.getElementById('coins').innerText =
'Coins: ' + coinCounter.count;

document.getElementById('level').innerText =
'Level: ' + level;

renderer.render(scene,camera);

}





/* =========================
   START GAME
========================= */

document
.getElementById('startButton')
.addEventListener('click',()=>{

document.getElementById('menu').style.display =
'none';

animate();

});
