export function applySkin(player,skin) {

if(skin === 'gold') {

player.material.color.set(0xffd700);

}

if(skin === 'neon') {

player.material.color.set(0x00ffff);

}

if(skin === 'shadow') {

player.material.color.set(0x111111);

}

}
