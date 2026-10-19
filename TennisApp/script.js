let currentServer = 'player1';
let player1Name, player2Name;

document.getElementById('startGame').addEventListener('click', function() {
    player1Name = document.getElementById('player1Name').value;
    player2Name = document.getElementById('player2Name').value;
    const player1Photo = document.getElementById('player1Photo').files[0];
    const player2Photo = document.getElementById('player2Photo').files[0];

    const selectedServer = document.querySelector('input[name="server"]:checked').value;
    currentServer = selectedServer;

    if (player1Photo && player2Photo) {
        displayPlayers(player1Name, player2Name, player1Photo, player2Photo);
        initializeScore();
        updateServerIndicator();
    }
});

function displayPlayers(player1, player2, player1Photo, player2Photo) {
    const player1PhotoDisplay = document.getElementById('player1PhotoDisplay');
    const player2PhotoDisplay = document.getElementById('player2PhotoDisplay');

    player1PhotoDisplay.src = URL.createObjectURL(player1Photo);
    player2PhotoDisplay.src = URL.createObjectURL(player2Photo);
}

function updateServerIndicator() {
    const currentServerDisplay = document.getElementById('currentServer');
    const currentServerPhoto = currentServer === 'player1' ? document.getElementById('player1PhotoDisplay').src : document.getElementById('player2PhotoDisplay').src;
    
    currentServerDisplay.innerHTML = `<img src="${currentServerPhoto}" alt="Current Server" style="width:50px;height:auto;">`;
}

let score = { player1: 0, player2: 0 };
let games = { player1: 0, player2: 0 };
const pointsNeededToWinGame = 4;
const gamesNeededToWinSet = 6;
const pointValues = ['0', '15', '30', '40', 'A'];

function initializeScore() {
    updateScore();
}

function updateScore() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Placar: ${games.player1} Games - ${games.player2} | Pontuação: ${pointValues[score.player1]} - ${pointValues[score.player2]}`;
}

function addPoint(winner) {
    if (score[winner] < 3) {
        score[winner]++;
    } else if (score[winner] === 3 && score[getOpponent(winner)] < 3) {
        score[winner]++;
        games[winner]++;
        resetPoints();
        switchServer();
    } else if (score[winner] === 3 && score[getOpponent(winner)] === 3) {
        score[winner]++;
    } else if (score[winner] === 4) {
        if (score[winner] > score[getOpponent(winner)]) {
            games[winner]++;
            resetPoints();
            switchServer();
        } else {
            score[winner] = 3;
        }
    }
    updateScore();
    updateGames();
}

function getOpponent(player) {
    return player === 'player1' ? 'player2' : 'player1';
}

function switchServer() {
    currentServer = getOpponent(currentServer);
    updateServerIndicator();
}

document.getElementById('faultButton').addEventListener('click', function() {
    alert('Dupla falta!');
    addPoint(getOpponent(currentServer));
});

document.getElementById('addPointPlayer1').addEventListener('click', function() {
    addPoint('player1');
});

document.getElementById('addPointPlayer2').addEventListener('click', function() {
    addPoint('player2');
});

document.getElementById('changeSideButton').addEventListener('click', function() {
    alert('Trocar quadra!');
});

function resetPoints() {
    score.player1 = 0;
    score.player2 = 0;
    updateScore();
}

function updateGames() {
    const summaryDisplay = document.getElementById('gameSummary');
    summaryDisplay.textContent = `Games: ${games.player1} - ${games.player2}`;
    if (games.player1 >= gamesNeededToWinSet) {
        alert(`${player1Name} venceu o set!`);
        resetGames();
    } else if (games.player2 >= gamesNeededToWinSet) {
        alert(`${player2Name} venceu o set!`);
        resetGames();
    }
}

function resetGames() {
    games.player1 = 0;
    games.player2 = 0;
    resetPoints();
}
