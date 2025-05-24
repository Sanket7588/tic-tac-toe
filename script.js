const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameState = Array(9).fill('');
let scores = { X: 0, O: 0 };
const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  gameBoard.innerHTML = '';
  gameState.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = index;
    div.addEventListener('click', handleClick, { once: true });
    div.textContent = cell;
    gameBoard.appendChild(div);
  });
}

function handleClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameState[index] === '') {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin()) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      highlightWinningCells();
      scores[currentPlayer]++;
      updateScore();
    } else if (gameState.every(cell => cell !== '')) {
      statusText.textContent = 'It\'s a Draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return gameState[a] &&
           gameState[a] === gameState[b] &&
           gameState[a] === gameState[c];
  });
}

function highlightWinningCells() {
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      document.querySelector(`[data-index='${a}']`).classList.add('winner');
      document.querySelector(`[data-index='${b}']`).classList.add('winner');
      document.querySelector(`[data-index='${c}']`).classList.add('winner');
    }
  });
}

function updateScore() {
  scoreX.textContent = scores['X'];
  scoreO.textContent = scores['O'];
}

restartBtn.addEventListener('click', () => {
  gameState.fill('');
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});

createBoard();
