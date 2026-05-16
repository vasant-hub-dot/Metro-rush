import { createPlayer, movePlayer } from './player.js';
import { spawnObstacle, updateObstacles } from './obstacle.js';
import { spawnCoin, updateCoins } from './coins.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
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

const ambient =
new THREE.AmbientLight(
0xffffff,
0.7
);

scene.add(ambient);





/* =========================
   ROAD
========================= */

const road = new THREE.Mesh(

new THREE.BoxGeometry(12,1,400),

new THREE.MeshStandardMaterial({
color:0x444444
})

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
   CHASER
========================= */

const chaser = new THREE.Group();

const chaserBody = new THREE.Mesh(

new THREE.BoxGeometry(1.2,2,1),

new THREE.MeshStandardMaterial({
color:0xff0000
})

);

chaserBody.position.y = 1.5;

const chaserHead = new THREE.Mesh(

new THREE.SphereGeometry(0.5,32,32),

new THREE.MeshStandardMaterial({
color:0xffcc99
})

);

chaserHead.position.y = 3;

chaser.add(chaserBody);

chaser.add(chaserHead);

chaser.position.set(0,0,18);

scene.add(chaser);





/* =========================
   BUILDINGS
========================= */

const buildings = [];

function createBuilding(x,z) {

const height =
5 + Math.random()*15;

const building = new THREE.Mesh(

new THREE.BoxGeometry(
5,
height,
5
),

new THREE.MeshStandardMaterial({

color:
Math.random()*0xffffff

})

);

building.position.set(
x,
height/2 -1,
z
);

scene.add(building);

buildings.push(building);

}

for(let i=0;i<50;i++) {

createBuilding(
-15,
-i*20
);

createBuilding(
15,
-i*20
);

}





/* =========================
   MOVING CARS
========================= */

const cars = [];

function spawnCar() {

const car = new THREE.Mesh(

new THREE.BoxGeometry(2,1,4),

new THREE.MeshStandardMaterial({
color:0xffff00
})

);

car.position.set(
Math.random()>0.5 ? -8 : 8,
0,
-100
);

scene.add(car);

cars.push(car);

}

setInterval(()=>{

spawnCar();

},3000);





/* =========================
   PLANES
========================= */

const planes = [];

function createPlane() {

const plane = new THREE.Mesh(

new THREE.BoxGeometry(4,1,2),

new THREE.MeshStandardMaterial({
color:0xffffff
})

);

plane.position.set(
(Math.random()-0.5)*40,
20,
-100
);

scene.add(plane);

planes.push(plane);

}

setInterval(()=>{

createPlane();

},7000);





/* =========================
   TRAFFIC LIGHTS
========================= */

for(let i=0;i<20;i++) {

const pole = new THREE.Mesh(

new THREE.CylinderGeometry(
0.1,
0.1,
5
),

new THREE.MeshStandardMaterial({
color:0x333333
})

);

pole.position.set(
-7,
2,
-i*30
);

scene.add(pole);

const redLight = new THREE.Mesh(

new THREE.SphereGeometry(0.3),

new THREE.MeshBasicMaterial({
color:0xff0000
})

);

redLight.position.set(
-7,
4,
-i*30
);

scene.add(redLight);

}





/* =========================
   SNOW
========================= */

const snow = [];

for(let i=0;i<300;i++) {

const particle = new THREE.Mesh(

new THREE.SphereGeometry(0.05),

new THREE.MeshBasicMaterial({
color:0xffffff
})

);

particle.position.set(
(Math.random()-0.5)*50,
Math.random()*20,
(Math.random()-0.5)*200
);

scene.add(particle);

snow.push(particle);

}





/* =========================
   RAIN
========================= */

const rain = [];

for(let i=0;i<300;i++) {

const drop = new THREE.Mesh(

new THREE.BoxGeometry(
0.03,
0.5,
0.03
),

new THREE.MeshBasicMaterial({
color:0x66ccff
})

);

drop.position.set(
(Math.random()-0.5)*50,
Math.random()*20,
(Math.random()-0.5)*200
);

scene.add(drop);

rain.push(drop);

}





/* =========================
   GAME STATS
========================= */

let score = 0;

let level = 1;

let speed = 0.6;

const coinCounter = {
count:0
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
   THEMES
========================= */

function updateTheme() {

if(level < 10) {

scene.background =
new THREE.Color(0x87ceeb);

road.material.color.set(
0x444444
);

}

else if(level < 20) {

scene.background =
new THREE.Color(0x001133);

road.material.color.set(
0x223388
);

}

else if(level < 30) {

scene.background =
new THREE.Color(0xe6f7ff);

road.material.color.set(
0xdddddd
);

}

else if(level < 40) {

scene.background =
new THREE.Color(0x220000);

road.material.color.set(
0x552222
);

}

else {

scene.background =
new THREE.Color(0x003366);

road.material.color.set(
0x006699
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





/* =========================
   CHASER
========================= */

chaser.position.x =
player.position.x;

chaser.position.z =
player.position.z + 18;





/* =========================
   CARS
========================= */

cars.forEach((car,index)=>{

car.position.z += 1;

if(car.position.z > 20) {

scene.remove(car);

cars.splice(index,1);

}

});





/* =========================
   PLANES
========================= */

planes.forEach((plane,index)=>{

plane.position.z += 1;

if(plane.position.z > 40) {

scene.remove(plane);

planes.splice(index,1);

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

level = Math.floor(score/500)+1;

speed = 0.6 + level*0.03;

updateTheme();





document.getElementById(
'score'
).innerText =
'Score: '+score;

document.getElementById(
'coins'
).innerText =
'Coins: '+coinCounter.count;

document.getElementById(
'level'
).innerText =
'Level: '+level;

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

document.getElementById(
'menu'
).style.display =
'none';

animate();

}
);
