export function createChaser() {

    const group = new THREE.Group();

    // BODY
    const body = new THREE.Mesh(

        new THREE.BoxGeometry(1,2,1),

        new THREE.MeshStandardMaterial({
            color: 0xff0000
        })

    );

    body.position.y = 1;

    // HEAD
    const head = new THREE.Mesh(

        new THREE.SphereGeometry(0.5,16,16),

        new THREE.MeshStandardMaterial({
            color: 0xffccaa
        })

    );

    head.position.y = 2.5;

    group.add(body);
    group.add(head);

    group.position.z = 8;

    return group;

}
