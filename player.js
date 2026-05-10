
const geometry = new THREE.CapsuleGeometry(0.6,1.2,8,16);

const material = new THREE.MeshStandardMaterial({

color: 0xffd700,
metalness: 1,
roughness: 0.2

});
lane++;

}

if(e.key === ' ') {

if(!isJumping) {

velocityY = 0.35;
isJumping = true;const player = new THREE.Mesh(geometry, material);

player.position.y = 1;

return player;

}

window.addEventListener('keydown',(e)=>{

if(e.key === 'ArrowLeft') {

lane--;

}

if(e.key === 'ArrowRight') {
let lane = 0;

let velocityY = 0;

let isJumping = false;

const gravity = 0.02;

export function createPlayer() {


}

}

lane = Math.max(-1,Math.min(1,lane));

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

  
