import { createPlayer, movePlayer } from './player.js';

import { spawnObstacle, updateObstacles }

from './obstacle.js';

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

const light = new THREE.DirectionalLight(0xffffff, 1);

light.position.set(0, 10, 10);

scene.add(light);

const roadGeometry = new THREE.BoxGeometry(10, 1, 200);

const roadMaterial =

new THREE.MeshStandardMaterial({

    color: 0x333333

});

const road = new THREE.Mesh(

    roadGeometry,

    roadMaterial

);

road.position.y = -1;

scene.add(road);

const player = createPlayer();

scene.add(player);

camera.position.set(0, 5, 10);

let score = 0;

let speed = 0.5;

setInterval(() => {

    spawnObstacle(scene);

}, 1500);

function animate() {

    requestAnimationFrame(animate);

    movePlayer(player);

    updateObstacles(scene, player, speed);

    score++;

    document.getElementById('score').innerText =

        'Score: ' + score;

    renderer.render(scene, camera);

}

animate();
