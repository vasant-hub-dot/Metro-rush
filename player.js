let lane = 0;

export function createPlayer() {

    const geometry = new THREE.BoxGeometry(1, 2, 1);

    const material = new THREE.MeshStandardMaterial({

        color: 0xaa00ff

    });

    const player = new THREE.Mesh(geometry, material);

    player.position.y = 1;

    return player;
}

window.addEventListener('keydown', (e) => {

    if(e.key === 'ArrowLeft') {

        lane--;

    }

    if(e.key === 'ArrowRight') {

        lane++;

    }

    lane = Math.max(-1, Math.min(1, lane));

});

export function movePlayer(player) {

    player.position.x = lane * 3;

}
