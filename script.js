const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
const resultText = document.querySelector('[data-result]');
const overlay = document.querySelector('#overlay');
const restartBtn = document.querySelector('#restart');
let xTurn = true;
const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]



restartBtn.addEventListener('click', startGame);


function startGame() {
    board.classList.remove('o');
    board.classList.add('x');
    xTurn = true;
    cells.forEach((el) => {
        el.classList.remove('x')
        el.classList.remove('o')
        el.removeEventListener('click', handleCellClick)
        el.addEventListener('click', handleCellClick, { once: true })
    })
    overlay.classList.remove('show');

}

function handleCellClick(e) {
    if (xTurn) {
        e.target.classList.add('x');
        board.classList.remove('x')
        board.classList.add('o');
    } else {
        e.target.classList.add('o');
        board.classList.remove('o')
        board.classList.add('x');
    }
    validateResult();
    xTurn = !xTurn;
}

function validateResult() {
    const className = xTurn? 'x' : 'o';
    if(checkWin(className)) {
        console.log(className + 'wins');
        endGame(className + ' wins');
    } else if(checkDrawGame()) {
        console.log('draw game');
        endGame('Draw game');
    }
}

function checkWin(className) {
    return winningComb.some((comb) => {
        return comb.every((index) => {
            return cells[index].classList.contains(className);
        })
    })
}

function checkDrawGame () {
    return [...cells].every((el) => {
        return el.classList.contains('x') || el.classList.contains('o')
    })
}

function endGame(msg) {
    resultText.textContent = msg;
    overlay.classList.add('show')
}

startGame();