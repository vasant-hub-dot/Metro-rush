import { createPlayer, movePlayer } from './player.js';
import { spawnObstacle, updateObstacles } from './obstacle.js';
import { spawnCoin, updateCoins } from './coins.js';

import { saveGame, loadGame } from './save.js';



/* =========================
SCENE
========================= */

const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x87ceeb);



/* =========================
CAMERA
========================= */

const camera =
new THREE.PerspectiveCamera(

75,
window.innerWidth /
window.innerHeight,
0.1,
1000

);



/* =========================
RENDERER
========================= */

const renderer =
new THREE.WebGLRenderer({

antialias:true

});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(
renderer.domElement
);



/* =========================
LIGHTS
========================= */

const light =
new THREE.DirectionalLight(
0xffffff,
1
);

light.position.set(0,20,10);

scene.add(light);

scene.add(
new THREE.AmbientLight(
0xffffff,
0.8
)
);



/* =========================
ROAD
========================= */

const road =
new THREE.Mesh(

new THREE.BoxGeometry(
14,
1,
500
),

new THREE.MeshStandardMaterial({
color:0x444444
})

);

road.position.y = -1;

scene.add(road);



/* =========================
PLAYER
========================= */

const player =
createPlayer();

const playerMaterial =
player.material;

scene.add(player);



/* =========================
CAMERA POSITION
========================= */

camera.position.set(
0,
7,
15
);

camera.lookAt(
0,
2,
-20
);



/* =========================
SAVE DATA
========================= */

let gameData = {

coins: 50000

};



const saved =
loadGame();

if(saved) {

gameData = saved;

}



/* =========================
HOVERBOARD
========================= */

const hoverboard =
new THREE.Mesh(

new THREE.BoxGeometry(
2,
0.2,
4
),

new THREE.MeshStandardMaterial({
color:0xff00ff
})

);

hoverboard.position.y =
0.2;

scene.add(hoverboard);



/* =========================
CHASER
========================= */

const chaser =
new THREE.Group();

const body =
new THREE.Mesh(

new THREE.BoxGeometry(
1.5,
2,
1
),

new THREE.MeshStandardMaterial({
color:0xff0000
})

);

body.position.y = 1.5;

const head =
new THREE.Mesh(

new THREE.SphereGeometry(
0.6,
32,
32
),

new THREE.MeshStandardMaterial({
color:0xffcc99
})

);

head.position.y = 3;

chaser.add(body);

chaser.add(head);

scene.add(chaser);



/* =========================
BUILDINGS
========================= */

for(let i=0;i<40;i++) {

const leftBuilding =
new THREE.Mesh(

new THREE.BoxGeometry(
10,
20 + Math.random()*20,
10
),

new THREE.MeshStandardMaterial({
color:
Math.random()*0xffffff
})

);

leftBuilding.position.set(
-12,
8,
-i*20
);

scene.add(leftBuilding);



const rightBuilding =
new THREE.Mesh(

new THREE.BoxGeometry(
10,
20 + Math.random()*20,
10
),

new THREE.MeshStandardMaterial({
color:
Math.random()*0xffffff
})

);

rightBuilding.position.set(
12,
8,
-i*20
);

scene.add(rightBuilding);

}



/* =========================
TRAINS
========================= */

const trains = [];

function spawnTrain() {

const train =
new THREE.Mesh(

new THREE.BoxGeometry(
5,
5,
20
),

new THREE.MeshStandardMaterial({
color:0x00ffff
})

);

const lanes =
[-3,0,3];

train.position.x =
lanes[
Math.floor(
Math.random()*3
)
];

train.position.y = 1.5;

train.position.z = -150;

scene.add(train);

trains.push(train);

}

setInterval(()=>{

spawnTrain();

},4000);



/* =========================
CARS
========================= */

const cars = [];

function spawnCar() {

const car =
new THREE.Mesh(

new THREE.BoxGeometry(
2,
1,
4
),

new THREE.MeshStandardMaterial({
color:0xffff00
})

);

car.position.x =
Math.random()>0.5
? -5
: 5;

car.position.y = 0;

car.position.z = -80;

scene.add(car);

cars.push(car);

}

setInterval(()=>{

spawnCar();

},2500);



/* =========================
PLANES
========================= */

const planes = [];

function spawnPlane() {

const plane =
new THREE.Mesh(

new THREE.BoxGeometry(
6,
1,
3
),

new THREE.MeshStandardMaterial({
color:0xffffff
})

);

plane.position.set(
0,
15,
-100
);

scene.add(plane);

planes.push(plane);

}

setInterval(()=>{

spawnPlane();

},6000);



/* =========================
GAME STATS
========================= */

let score = 0;

let level = 1;

let speed = 0.7;

const coinCounter = {

count:
gameData.coins

};



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
SHOP MENU
========================= */

document
.getElementById(
'shopButton'
)
.addEventListener(
'click',
()=>{

document
.getElementById(
'shopMenu'
)
.style.display =
'flex';

}
);



document
.getElementById(
'closeShop'
)
.addEventListener(
'click',
()=>{

document
.getElementById(
'shopMenu'
)
.style.display =
'none';

}
);



/* =========================
BUY NINJA
========================= */

document
.getElementById(
'buyNinja'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 100
) {

coinCounter.count -= 100;

if(player.material) {

player.material.color.set(
0x111111
);

}

alert(
'Ninja Unlocked'
);

saveProgress();

}

}
);



/* =========================
BUY ROBOT
========================= */

document
.getElementById(
'buyRobot'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 300
) {

coinCounter.count -= 300;

if(player.material) {

player.material.color.set(
0xaaaaaa
);

}

alert(
'Robot Unlocked'
);

saveProgress();

}

}
);



/* =========================
BUY FIRE
========================= */

document
.getElementById(
'buyFire'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 1000
) {

coinCounter.count -= 1000;

if(player.material) {

player.material.color.set(
0xff3300
);

}

alert(
'Fire Warrior Unlocked'
);

saveProgress();

}

}
);



/* =========================
BUY GALAXY
========================= */

document
.getElementById(
'buyGalaxy'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 10000
) {

coinCounter.count -= 10000;

if(player.material) {

player.material.color.set(
0x9900ff
);

}

alert(
'Galaxy Runner Unlocked'
);

saveProgress();

}

}
);



/* =========================
BUY HOVERBOARDS
========================= */

document
.getElementById(
'buyNeonBoard'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 200
) {

coinCounter.count -= 200;

hoverboard.material.color.set(
0xff00ff
);

alert(
'Neon Board Unlocked'
);

saveProgress();

}

}
);



document
.getElementById(
'buyIceBoard'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 800
) {

coinCounter.count -= 800;

hoverboard.material.color.set(
0x66ccff
);

alert(
'Ice Board Unlocked'
);

saveProgress();

}

}
);



document
.getElementById(
'buyLavaBoard'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 2000
) {

coinCounter.count -= 2000;

hoverboard.material.color.set(
0xff2200
);

alert(
'Lava Board Unlocked'
);

saveProgress();

}

}
);



document
.getElementById(
'buyGalaxyBoard'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 15000
) {

coinCounter.count -= 15000;

hoverboard.material.color.set(
0x6600ff
);

alert(
'Galaxy Board Unlocked'
);

saveProgress();

}

}
);



/* =========================
SAVE FUNCTION
========================= */

function saveProgress() {

gameData.coins =
coinCounter.count;

saveGame(gameData);

}



/* =========================
THEMES
========================= */

function updateTheme() {

if(level < 10) {

scene.background =
new THREE.Color(
0x87ceeb
);

}

else if(level < 20) {

scene.background =
new THREE.Color(
0x001133
);

}

else if(level < 30) {

scene.background =
new THREE.Color(
0xe6f7ff
);

}

else if(level < 40) {

scene.background =
new THREE.Color(
0x330000
);

}

else {

scene.background =
new THREE.Color(
0x003366
);

}

}



/* =========================
ANIMATE
========================= */

function animate() {

requestAnimationFrame(
animate
);

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



/* HOVERBOARD */

hoverboard.position.x =
player.position.x;

hoverboard.position.z =
player.position.z;

hoverboard.position.y =
0.2;



/* CHASER */

chaser.position.x =
player.position.x;

chaser.position.z =
player.position.z + 5;



/* TRAINS */

trains.forEach(
(train,index)=>{

train.position.z +=
speed * 2;

if(
train.position
.distanceTo(
player.position
) < 3
) {

alert(
'HIT BY TRAIN'
);

location.reload();

}

if(train.position.z > 40) {

scene.remove(train);

trains.splice(index,1);

}

}
);



/* CARS */

cars.forEach(
(car,index)=>{

car.position.z += 1.5;

if(car.position.z > 40) {

scene.remove(car);

cars.splice(index,1);

}

}
);



/* PLANES */

planes.forEach(
(plane,index)=>{

plane.position.z += 2;

if(plane.position.z > 50) {

scene.remove(plane);

planes.splice(index,1);

}

}
);



/* TRAIL EFFECT */

const trail =
new THREE.Mesh(

new THREE.SphereGeometry(
0.08
),

new THREE.MeshBasicMaterial({
color:0xff00ff
})

);

trail.position.copy(
player.position
);

scene.add(trail);

setTimeout(()=>{

scene.remove(trail);

},200);



score++;

level =
Math.floor(score/500)+1;

speed =
0.7 + level*0.03;

updateTheme();



document
.getElementById(
'score'
)
.innerText =
'Score: ' + score;



document
.getElementById(
'coins'
)
.innerText =
'Coins: ' +
coinCounter.count;



document
.getElementById(
'level'
)
.innerText =
'Level: ' +
level;



renderer.render(
scene,
camera
);

}



/* =========================
START GAME
========================= */

document
.getElementById(
'startButton'
)
.addEventListener(
'click',
()=>{

document
.getElementById(
'menu'
)
.style.display =
'none';

animate();

}
);
