const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 'X'; // X is Player 1, O is Player 2
let gameStatus = document.querySelector('#game-status');
let gameOver = false;
let popup = document.querySelector('#popup');
let winnerMessage = document.querySelector('#winner-message');
let darkModeToggle = document.querySelector('#dark-mode-toggle');
let restartButton = document.querySelector('#restart-btn');
let startButton = document.querySelector('#start-btn');
let player1NameInput = document.querySelector('#player1-name');
let player2NameInput = document.querySelector('#player2-name');
let player1Name, player2Name;

// Function to start the game
function startGame() {
    player1Name = player1NameInput.value || 'Player 1';
    player2Name = player2NameInput.value || 'Player 2';

    // Show game board and hide name input section
    document.querySelector('#player-names-section').classList.add('hidden');
    document.querySelector('#game-board-section').classList.remove('hidden');
    currentPlayer = 'X'; // Reset to Player 1 (X)
    gameStatus.textContent = `${player1Name}'s Turn (X)`;

    resetBoard();
}

// Function to handle player moves
function handleMove(cell, index) {
    if (cell.textContent || gameOver) return;
    cell.textContent = currentPlayer;

    // Check if the current player has won
    if (checkWinner(currentPlayer)) {
        gameOver = true;
        if (currentPlayer === 'X') {
            player1Score++;
            winnerMessage.textContent = `${player1Name} (X) Wins!`;
        } else {
            player2Score++;
            winnerMessage.textContent = `${player2Name} (O) Wins!`;
        }
        gameStatus.textContent = winnerMessage.textContent;
        popup.style.display = 'flex';
        updateScoreboard();
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = currentPlayer === 'X' ? `${player1Name}'s Turn (X)` : `${player2Name}'s Turn (O)`;
    }
}

// Function to check if a player has won
function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => cells[index].textContent === player);
    });
}

// Function to reset the board
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    gameOver = false;
}

// Update score on the scoreboard
function updateScoreboard() {
    document.querySelector('#player1-score').textContent = `${player1Name} (X): ${player1Score}`;
    document.querySelector('#player2-score').textContent = `${player2Name} (O): ${player2Score}`;
}

// Close popup
document.querySelector('#close-popup').addEventListener('click', () => {
    popup.style.display = 'none';
    resetBoard();
});

// Restart the game
restartButton.addEventListener('click', resetBoard);

// Dark Mode toggle functionality
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Start the game when the user enters names
startButton.addEventListener('click', startGame);

// Handle player moves
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        handleMove(cell, cell.dataset.index);
    });
});
