function savePlayerInfo(event) {
    event.preventDefault();
    const name1 = document.getElementById('name1').value;
    const gender1 = document.getElementById('gender1').value;
    const name2 = document.getElementById('name2').value;
    const gender2 = document.getElementById('gender2').value;

    localStorage.setItem('player1', JSON.stringify({ name: name1, gender: gender1 }));
    localStorage.setItem('player2', JSON.stringify({ name: name2, gender: gender2 }));

    window.location.href = 'player1.html';
}

function savePlayer1Number(event) {
    event.preventDefault();
    const number1 = document.getElementById('number1').value;

    if (new Set(number1).size !== 4) {
        alert('Tous les chiffres doivent être uniques.');
        return;
    }

    localStorage.setItem('number1', number1);
    window.location.href = 'player2.html';
}

function savePlayer2Number(event) {
    event.preventDefault();
    const number2 = document.getElementById('number2').value;

    if (new Set(number2).size !== 4) {
        alert('Tous les chiffres doivent être uniques.');
        return;
    }

    localStorage.setItem('number2', number2);
    window.location.href = 'game.html';
}

function submitGuess(event, player) {
    event.preventDefault();
    const guess = document.getElementById(`guess${player}`).value;
    const opponentNumber = localStorage.getItem(`number${player === 1 ? 2 : 1}`);
    const guessesContainer = document.getElementById(`player${player}Guesses`);

    if (new Set(guess).size !== 4) {
        alert('Tous les chiffres doivent être uniques.');
        return;
    }

    const result = evaluateGuess(guess, opponentNumber);
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `Guess: ${guess} <br> Result: ${result}`;
    guessesContainer.appendChild(resultDiv);

    if (result === '<span class="correct">V</span><span class="correct">V</span><span class="correct">V</span><span class="correct">V</span>') {
        const winner = JSON.parse(localStorage.getItem(`player${player}`));
        const loser = JSON.parse(localStorage.getItem(`player${player === 1 ? 2 : 1}`));

        localStorage.setItem('winnerName', winner.name);
        localStorage.setItem('winnerGender', winner.gender);
        localStorage.setItem('loserName', loser.name);
        localStorage.setItem('loserGender', loser.gender);

        window.location.href = 'gagnant.html';
    }
}

function evaluateGuess(guess, correctNumber) {
    let result = '';

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === correctNumber[i]) {
            result += '<span class="correct">V</span>';
        } else if (correctNumber.includes(guess[i])) {
            result += '<span class="wrong-position">R</span>';
        } else {
            result += '<span class="incorrect">F</span>';
        }
    }

    return result;
}

function initializeGamePage() {
    const player1 = JSON.parse(localStorage.getItem('player1'));
    const player2 = JSON.parse(localStorage.getItem('player2'));

    document.getElementById('player1Name').textContent = player1.name;
    document.getElementById('player2Name').textContent = player2.name;
}

if (window.location.pathname.includes('game.html')) {
    initializeGamePage();
}
/////////////

function playAgainst(opponent) {
    localStorage.setItem('opponent', opponent);
    if (opponent === 'robot') {
        window.location.href = 'robot.html';
    } else {
        window.location.href = 'home.html';
    }
}

function startRobotGame() {
    const robotNumber = generateRandomNumber();
    localStorage.setItem('robotNumber', robotNumber);
    window.location.href = 'game2.html';
}
function generateRandomNumber() {
    let digits = [];
    while (digits.length < 4) {
        const digit = Math.floor(Math.random() * 10).toString();
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return digits.join('');
}

function submitGuess2(event) {
    event.preventDefault();
    const guess = document.getElementById('guess').value;
    const opponent = localStorage.getItem('opponent');
    const opponentNumber = localStorage.getItem(opponent === 'robot' ? 'robotNumber' : 'number2');
    const guessesContainer = document.getElementById('guesses');

    if (new Set(guess).size !== 4) {
        alert('Tous les chiffres doivent être uniques.');
        return;
    }

    const result = evaluateGuess2(guess, opponentNumber);
    const resultDiv = document.createElement('div');
    resultDiv.textContent = `Guess: ${guess}  - Result: ${result}`;
    guessesContainer.appendChild(resultDiv);

    if (result === 'VVVV') {
        localStorage.setItem('winner', JSON.stringify(localStorage.getItem('player1')));
        window.location.href = 'winner.html';
    } else {
        const remainingAttempts = parseInt(localStorage.getItem('remainingAttempts')) - 1;
        localStorage.setItem('remainingAttempts', remainingAttempts);
        if (remainingAttempts === 0) {
            window.location.href = 'loser.html';
        }
    }
}
function evaluateGuess2(guess, correctNumber) {
    let result = '';

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === correctNumber[i]) {
            result += 'V';
        } else if (correctNumber.includes(guess[i])) {
            result += 'R';
        } else {
            result += 'F';
        }
    }

    return result;
}

function initializeGamePage2() {
    const player11 = JSON.parse(localStorage.getItem('player1'));
    document.getElementById('playerName').textContent = player11.name;
    localStorage.setItem('remainingAttempts',5);
}

function initializeWinnerPage2() {
    const winner2 = JSON.parse(localStorage.getItem('winner'));
    const winnerInfo2 = winner2.gender === 'M' ? `Mr. ${winner2.name}` : `Madame ${winner2.name}`;
    document.getElementById('winner-info').textContent = `Vous êtes le gagnant, ${winnerInfo2}! 
    Comme vous êtes merveilleux!`;
}

function initializeLoserPage2() {
    const player3 = JSON.parse(localStorage.getItem('player1'));
    const loserInfo = `Désolé, ${player3.name}, vous avez perdu. Essayez encore!`;
    document.getElementById('loser-info').textContent = loserInfo;
}
function restartGame() {
    localStorage.clear();
    window.location.href = 'index.html';
}

if (window.location.pathname.includes('loser.html')) {
    initializeGamePage2();
}

if (window.location.pathname.includes('winner.html')) {
    initializeWinnerPage2();
}


if (window.location.pathname.includes('loser.html')) {
    initializeLoserPage2();
}
