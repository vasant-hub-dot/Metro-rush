let lane = 0;

let velocityY = 0;

let isJumping = false;

const gravity = 0.02;

export function createPlayer(){

const playerGroup =
new THREE.Group();

const bodyGeometry =
new THREE.BoxGeometry(
1,
2,
1
);

const bodyMaterial =
new THREE.MeshStandardMaterial({

color:0x00ffff

});

const body =
new THREE.Mesh(
bodyGeometry,
bodyMaterial
);

playerGroup.add(body);

const headGeometry =
new THREE.SphereGeometry(
0.5,
32,
32
);

const headMaterial =
new THREE.MeshStandardMaterial({

color:0xffcc99

});

const head =
new THREE.Mesh(
headGeometry,
headMaterial
);

head.position.y = 1.7;

playerGroup.add(head);

const boardGeometry =
new THREE.BoxGeometry(
2,
0.2,
1
);

const boardMaterial =
new THREE.MeshStandardMaterial({

color:0xff00ff,
emissive:0xff00ff

});

const board =
new THREE.Mesh(
boardGeometry,
boardMaterial
);

board.position.y = -1.1;

playerGroup.add(board);

playerGroup.position.y = 1;

return playerGroup;

}

window.addEventListener(
'keydown',
(e)=>{

if(e.key === 'ArrowLeft'){

lane--;

}

if(e.key === 'ArrowRight'){

lane++;

}

if(e.key === ' ') {

if(!isJumping){

velocityY = 0. 55;

isJumping = true;

}

}

lane =
Math.max(
-1,
Math.min(1,lane)
);

}
);

export function movePlayer(player){

player.position.x =
lane * 3;

player.position.y +=
velocityY;

velocityY -= gravity;

if(player.position.y <= 1){

player.position.y = 1;

velocityY = 0;

isJumping = false;

}

}
