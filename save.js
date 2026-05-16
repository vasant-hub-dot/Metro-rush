export function saveGame(data) {

localStorage.setItem(
'MetroRushSave',
JSON.stringify(data)
);

}



export function loadGame() {

const data = localStorage.getItem(
'MetroRushSave'
);

if(data) {

return JSON.parse(data);

}

return null;

}



export function resetSave() {

localStorage.removeItem(
'MetroRushSave'
);

}
