export function applyTheme(scene, level) {

    if(level <= 5) {

        // DAY CITY
        scene.background = new THREE.Color(0x87ceeb);

    }

    else if(level <= 10) {

        // SUNSET
        scene.background = new THREE.Color(0xff8844);

    }

    else if(level <= 15) {

        // NIGHT
        scene.background = new THREE.Color(0x000022);

    }

    else if(level <= 20) {

        // SNOW
        scene.background = new THREE.Color(0xe0f7ff);

    }

    else if(level <= 25) {

        // RAIN
        scene.background = new THREE.Color(0x333333);

    }

    else if(level <= 30) {

        // SPACE
        scene.background = new THREE.Color(0x050010);

    }

    else if(level <= 35) {

        // FIRE WORLD
        scene.background = new THREE.Color(0xaa2200);

    }

    else {

        // FINAL BOSS WORLD
        scene.background = new THREE.Color(0x220000);

    }

}
