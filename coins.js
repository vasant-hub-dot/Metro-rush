const coins = [];

export function spawnCoin(scene) {

const geometry = new THREE.TorusGeometry(0.5,0.2,16,100);

const material = new THREE.MeshStandardMaterial({

color: 0xffff00,
emissive: 0xffaa00

});

const coin = new THREE.Mesh(geometry,material);

const lanes = [-3,0,3];

coin.position.x =
lanes[Math.floor(Math.random()*lanes.length)];

coin.position.z = -100;
coin.position.y = 2;

scene.add(coin);
coins.push(coin);

}

export function updateCoins(scene,player,speed,coinCounter) {

coins.forEach((coin,index)=>{

coin.rotation.y += 0.1;

coin.position.z += speed;

const distance = coin.position.distanceTo(player.position);

if(distance < 1.5) {

scene.remove(coin);
coins.splice(index,1);
coinCounter.count++;

}

if(coin.position.z > 20) {

scene.remove(coin);
coins.splice(index,1);

}

});

}
