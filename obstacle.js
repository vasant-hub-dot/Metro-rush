const obstacles = [];

export function spawnObstacle(scene) {

const trainGroup =
new THREE.Group();

const bodyGeometry =
new THREE.BoxGeometry(
4,
4,
12
);

const bodyMaterial =
new THREE.MeshStandardMaterial({

color: 0x0066ff,
metalness: 0.8,
roughness: 0.3

});

const body =
new THREE.Mesh(
bodyGeometry,
bodyMaterial
);

trainGroup.add(body);

const windowGeometry =
new THREE.BoxGeometry(
3,
1,
0.2
);

const windowMaterial =
new THREE.MeshStandardMaterial({

color: 0x99ddff,
emissive: 0x222244

});

for(let i=-1; i<=1; i++) {

const win =
new THREE.Mesh(
windowGeometry,
windowMaterial
);

win.position.set(
0,
1,
i*3
);

win.position.z += 6;

trainGroup.add(win);

}

const lanes = [-3,0,3];

trainGroup.position.x =
lanes[
Math.floor(
Math.random()*lanes.length
)
];

trainGroup.position.z = -120;

trainGroup.position.y = 2;

scene.add(trainGroup);

obstacles.push(trainGroup);

}

export function updateObstacles(
scene,
player,
speed
) {

obstacles.forEach((obs,index)=>{

obs.position.z += speed;

const distance =
obs.position.distanceTo(
player.position
);

if(distance < 3) {

alert('GAME OVER');

location.reload();

}

if(obs.position.z > 20) {

scene.remove(obs);

obstacles.splice(index,1);

}

});

}
