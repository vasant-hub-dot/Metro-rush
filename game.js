import { createPlayer, movePlayer } from './player.js';
import { spawnObstacle, updateObstacles } from './obstacle.js';
import { spawnCoin, updateCoins } from './coins.js';



/* SCENE */

const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x87ceeb);



/* CAMERA */

const camera =
new THREE.PerspectiveCamera(

75,
window.innerWidth /
window.innerHeight,
0.1,
1000

);



/* RENDERER */

const renderer =
new THREE.WebGLRenderer({

antialias:true

});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(
renderer.domElement);



/* LIGHTS */

const light =
new THREE.DirectionalLight(
0xffffff,
1
);

light.position.set(
0,
20,
10
);

scene.add(light);

scene.add(
new THREE.AmbientLight(
0xffffff,
0.7
)
);



/* ROAD */

const road =
new THREE.Mesh(

new THREE.BoxGeometry(
14,
1,
1000
),

new THREE.MeshStandardMaterial({
color:0x444444
})

);

road.position.y = -1;

scene.add(road);



/* PLAYER */

const player =
createPlayer();

scene.add(player);



/* PLAYER MATERIAL */

const playerMaterial =
player.material;



/* CAMERA POSITION */

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



/* SAVE COINS */

let savedCoins =
localStorage.getItem(
'metroCoins'
);

if(savedCoins === null){

savedCoins = 50000;

localStorage.setItem(
'metroCoins',
savedCoins
);

}



const coinCounter = {

count:
Number(savedCoins)

};



/* GAME VARIABLES */

let score = 0;

let level = 1;

let speed = 1;

let paused = false;

let gameEnded = false;



/* HOVERBOARD */

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

scene.add(hoverboard);



/* CHASER */

const chaser =
new THREE.Mesh(

new THREE.BoxGeometry(
1.5,
3,
1
),

new THREE.MeshStandardMaterial({
color:0xff0000
})

);

chaser.position.y = 1;

scene.add(chaser);



/* BUILDINGS */

for(let i=0;i<80;i++){

const left =
new THREE.Mesh(

new THREE.BoxGeometry(
10,
20 + Math.random()*40,
10
),

new THREE.MeshStandardMaterial({
color:
Math.random()*0xffffff
})

);

left.position.set(
-18,
10,
-i*20
);

scene.add(left);



const right =
new THREE.Mesh(

new THREE.BoxGeometry(
10,
20 + Math.random()*40,
10
),

new THREE.MeshStandardMaterial({
color:
Math.random()*0xffffff
})

);

right.position.set(
18,
10,
-i*20
);

scene.add(right);

}



/* TRAINS */

const trains = [];

function spawnTrain(){

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
Math.floor(Math.random()*3)
];

train.position.y = 2;

train.position.z = -150;

scene.add(train);

trains.push(train);

}

setInterval(()=>{

if(!paused){

spawnTrain();

}

},4000);



/* CARS */

const cars = [];

function spawnCar(){

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

const lanes =
[-3,0,3];

car.position.x =
lanes[
Math.floor(Math.random()*3)
];

car.position.y = 0;

car.position.z = -120;

scene.add(car);

cars.push(car);

}

setInterval(()=>{

if(!paused){

spawnCar();

}

},2500);



/* PLANES */

const planes = [];

function spawnPlane(){

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
20,
-200
);

scene.add(plane);

planes.push(plane);

}

setInterval(()=>{

if(!paused){

spawnPlane();

}

},7000);



/* OBSTACLES + COINS */

setInterval(()=>{

if(!paused){

spawnObstacle(scene);

}

},1200);



setInterval(()=>{

if(!paused){

spawnCoin(scene);

}

},1000);



/* SHOP OPEN */

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



/* SHOP CLOSE */

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



/* PAUSE */

document
.getElementById(
'pauseButton'
)
.addEventListener(
'click',
()=>{

paused = !paused;

if(!paused){

animate();

}

}
);



/* CHARACTER SHOP */

document
.getElementById(
'buyNinja'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 100
){

coinCounter.count -= 100;

localStorage.setItem(
'metroCoins',
coinCounter.count
);

playerMaterial.color.set(
0x111111
);

}

}
);



document
.getElementById(
'buyRobot'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 300
){

coinCounter.count -= 300;

localStorage.setItem(
'metroCoins',
coinCounter.count
);

playerMaterial.color.set(
0xaaaaaa
);

}

}
);



document
.getElementById(
'buyFire'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 1000
){

coinCounter.count -= 1000;

localStorage.setItem(
'metroCoins',
coinCounter.count
);

playerMaterial.color.set(
0xff3300
);

}

}
);



document
.getElementById(
'buyGalaxy'
)
.addEventListener(
'click',
()=>{

if(
coinCounter.count >= 10000
){

coinCounter.count -= 10000;

localStorage.setItem(
'metroCoins',
coinCounter.count
);

playerMaterial.color.set(
0x9900ff
);

}

}
);



/* THEMES */

function updateTheme(){

if(level < 10){

scene.background =
new THREE.Color(
0x87ceeb
);

}

else if(level < 20){

scene.background =
new THREE.Color(
0x001133
);

}

else if(level < 30){

scene.background =
new THREE.Color(
0xe6f7ff
);

}

else if(level < 40){

scene.background =
new THREE.Color(
0x330000
);

}

else{

scene.background =
new THREE.Color(
0x003366
);

}

}



/* GAME OVER */

function gameOver(){

if(gameEnded) return;

gameEnded = true;

paused = true;



/* CHASER CATCHES PLAYER */

const catchInterval =
setInterval(()=>{

chaser.position.z -= 0.3;

if(
chaser.position.distanceTo(
player.position
) < 1
){

clearInterval(
catchInterval
);

alert(
'Police Caught You!'
);

location.reload();

}

},16);

}



/* ANIMATE */

function animate(){

if(paused) return;

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

if(!gameEnded){

chaser.position.x =
player.position.x;

chaser.position.z =
player.position.z + 6;

}



/* TRAINS */

trains.forEach(
(train,index)=>{

train.position.z +=
speed * 2;



if(
train.position.distanceTo(
player.position
) < 3
){

gameOver();

}



if(train.position.z > 40){

scene.remove(train);

trains.splice(index,1);

}

}
);



/* CARS */

cars.forEach(
(car,index)=>{

car.position.z +=
speed * 1.5;



if(
car.position.distanceTo(
player.position
) < 2
){

gameOver();

}



if(car.position.z > 40){

scene.remove(car);

cars.splice(index,1);

}

}
);



/* PLANES */

planes.forEach(
(plane,index)=>{

plane.position.z += 3;



if(plane.position.z > 50){

scene.remove(plane);

planes.splice(index,1);

}

}
);



/* SCORE */

score++;

level =
Math.floor(score/500)+1;

speed =
1 + level*0.05;



updateTheme();



/* HUD */

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



document
.getElementById(
'speed'
)
.innerText =
'Speed: ' +
speed.toFixed(1);



document
.getElementById(
'shopCoins'
)
.innerText =
'Coins: ' +
coinCounter.count;



renderer.render(
scene,
camera
);

}



/* START */

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
