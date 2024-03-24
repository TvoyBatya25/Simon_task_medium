let aiRound = [];
let myRound = [];
let level = 0;
let isComputerTurn = false;

const startButton = document.querySelector('.start-button');
const info = document.querySelector('.info');
const heading = document.querySelector('.heading');
const container = document.querySelector('.js-container')



function activateTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout(() => {
        tile.classList.remove('activated');
    }, 300);
}

function playRounds(nextSequence) {
    let delay = nextSequence.length * 1500;
    let isPlayerTurn = false;
    nextSequence.forEach((color, index) => {
        setTimeout(() => {
            activateTile(color);
            if (index === nextSequence.length - 1) {
                isPlayerTurn = true;
                showYourTurnMessage();
            }
        }, index * 1000);
    });
    setTimeout(() => {
        if (isPlayerTurn) {
            myTurn(level);
        }
    }, delay);
}


function step() {
    const tiles = ['red', 'green', 'blue', 'yellow'];
    const random = tiles[Math.floor(Math.random() * tiles.length)];
    return random;
}

function nextRound() {
    level += 1;

    container.classList.add('unclickable');
    info.textContent = 'Подождите хода компьютера';
    isComputerTurn = true;

    const nextSequence = [...aiRound];
    nextSequence.push(step());
    playRounds(nextSequence);

    aiRound = [...nextSequence];
    setTimeout(() => {
        myTurn(level);
        isComputerTurn = false;
    }, level * 600 + 1000 + nextSequence.length * 1500);
}

function myTurn() {
    container.classList.remove('unclickable');

}

function showYourTurnMessage() {
    if (!isComputerTurn) {
        info.textContent = 'Ваша очередь';
    }
}

container.addEventListener('click', event => {
    const { tile } = event.target.dataset;
    if (tile) handleClick(tile);
});

function handleClick(tile) {
    const index = myRound.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();



    if (myRound[index] !== aiRound[index]) {
        resetGame('Вы проиграли :(');
        return;
    }

    if (myRound.length === aiRound.length) {
        if (myRound.length === 35) {
            resetGame('Вы прошли игру!');
            return;
        }

        myRound = [];
        info.textContent = 'Верно!';
        setTimeout(() => {
            nextRound();
        }, 1000);
        return;
    }

    const remainingTaps = aiRound.length - myRound.length;

    if (remainingTaps === 0) {
        info.textContent = 'Ваша очередь! Нажмите на плитку';
    } else {
        info.textContent = `Вам осталось нажать: ${remainingTaps}`;
    }

}

function resetGame(text) {
    alert(text);
    sequence = [];
    aiRound = [];
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Simon Game';
    info.classList.add('hidden');
    container.classList.add('unclickable');
}

function startGame() {
    info.classList.remove('hidden');
    info.textContent = 'Подождите хода компьютера';
    nextRound();
}

startButton.addEventListener('click', startGame);