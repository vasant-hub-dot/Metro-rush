let boss;

export function createBoss(scene) {

const geometry = new THREE.BoxGeometry(5,8,5);

const material = new THREE.MeshStandardMaterial({

color: 0xff0000,
emissive: 0xaa0000

});

boss = new THREE.Mesh(geometry,material);

boss.position.set(0,4,-80);

scene.add(boss);

}

export function updateBoss(speed) {

if(boss) {

boss.position.z += speed * 0.8;

}

}
