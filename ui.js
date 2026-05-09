export function updateHUD(score, level)
{
    document.getElementById('score').innerText =

        'Score: ' + score;

    document.getElementById('level').innerText =

        'Level: ' + level;
}

export function showGameOver()
{
    alert("GAME OVER");
}

export function showVictory()
{
    alert("YOU WON THE TROPHY!");
}
