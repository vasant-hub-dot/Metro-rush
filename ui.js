export function updateHUD(score,level,coins) {

document.getElementById('score').innerText =
'Score: ' + score;

document.getElementById('level').innerText =
'Level: ' + level;

document.getElementById('coins').innerText =
'Coins: ' + coins;

}

export function showVictory() {

alert('YOU WON THE TROPHY!');

}
