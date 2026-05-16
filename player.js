let lane = 0;

let velocityY = 0;

let isJumping = false;

const gravity = 0.02;

export function createPlayer() {

const playerGroup =
new THREE.Group();

const bodyGeometry =
new THREE.CapsuleGeometry(
0.6,
1.2,
8,
16
);

const bodyMaterial =
new THREE.MeshStandardMaterial({

color: 0x00ffff,
metalness: 1,
roughness: 0.2

});

const body =
new THREE.Mesh(
bodyGeometry,
bodyMaterial
);

playerGroup.add(body);

const boardGeometry =
new THREE.BoxGeometry(
2,
0.2,
1
);

const boardMaterial =
new THREE.MeshStandardMaterial({

color: 0xff00ff,
emissive: 0xff00ff

});

const board =
new THREE.Mesh(
boardGeometry,
boardMaterial
);

board.position.y = -1;

playerGroup.add(board);

playerGroup.position.y = 1;

return playerGroup;

}

window.addEventListener('keydown',(e)=>{

if(e.key === 'ArrowLeft') {

lane--;

}

if(e.key === 'ArrowRight') {

lane++;

}

if(e.key === ' ') {

if(!isJumping) {

velocityY = 0.35;

isJumping = true;

}

}

lane = Math.max(
-1,
Math.min(1,lane)
);

});

export function movePlayer(player) {

player.position.x = lane * 3;

player.position.y += velocityY;

velocityY -= gravity;

if(player.position.y <= 1) {

player.position.y = 1;

velocityY = 0;

isJumping = false;

}

}
