const obstacles = [];

export function spawnObstacle(scene) {

    const geometry = new THREE.BoxGeometry(2, 2, 2);

    const material = new THREE.MeshStandardMaterial({

        color: 0xff0000

    });

    const obstacle = new THREE.Mesh(geometry, material);

    const lanes = [-3, 0, 3];

    obstacle.position.x =

        lanes[Math.floor(Math.random() * lanes.length)];

    obstacle.position.z = -100;

    obstacle.position.y = 1;

    scene.add(obstacle);

    obstacles.push(obstacle);
}

export function updateObstacles(scene, player, speed) {

    obstacles.forEach((obs, index) => {

        obs.position.z += speed;

        const distance = obs.position.distanceTo(player.position);

        if(distance < 1.5) {

            alert('Game Over');

            location.reload();

        }

        if(obs.position.z > 20) {

            scene.remove(obs);

            obstacles.splice(index, 1);

        }

    });
}
