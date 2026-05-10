const obstacles = [];

export function spawnObstacle(scene) {

const geometry = new THREE.BoxGeometry(3,4,10);

const material = new THREE.MeshStandardMaterial({

color: 0x555555,
metalness: 0.8

});

const obstacle = new THREE.Mesh(geometry, material);

const lanes = [-3,0,3];

obstacle.position.x =
lanes[Math.floor(Math.random()*lanes.length)];

obstacle.position.z = -120;
obstacle.position.y = 2;

scene.add(obstacle);

obstacles.push(obstacle);

}

export function updateObstacles(scene,player,speed) {

obstacles.forEach((obs,index)=>{

obs.position.z += speed;

const distance = obs.position.distanceTo(player.position);

if(distance < 2.5) {

alert('GAME OVER');
location.reload();

}

if(obs.position.z > 20) {

scene.remove(obs);
obstacles.splice(index,1);

}

});

}
