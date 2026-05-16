const particles = [];

export function createSnow(scene) {

    for(let i=0;i<200;i++) {

        const snow = new THREE.Mesh(

            new THREE.SphereGeometry(0.05),

            new THREE.MeshStandardMaterial({
                color: 0xffffff
            })

        );

        snow.position.x = (Math.random()-0.5)*30;
        snow.position.y = Math.random()*20;
        snow.position.z = (Math.random()-0.5)*200;

        scene.add(snow);

        particles.push(snow);

    }

}

export function updateSnow() {

    particles.forEach((p)=>{

        p.position.y -= 0.05;

        if(p.position.y < 0) {

            p.position.y = 20;

        }

    });

}
