document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const statusText = document.getElementById('status');
    const resetBtn = document.getElementById('reset-btn');

    let currentPlayer = 'X';
    let gameState = Array(9).fill('');
    let gameActive = true;

    // Fixed: Data URIs for X and O icons (No external files needed)
    const symbols = {
        X: `data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 20,20 L 80,80 M 80,20 L 20,80" stroke="%23d4af37" stroke-width="12" stroke-linecap="round"/></svg>`,
        O: `data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="35" stroke="%238a2be2" stroke-width="12" fill="none"/></svg>`
    };

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function createBoard() {
        board.innerHTML = '';
        gameState.forEach((_, i) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            const img = document.createElement('img');
            cell.appendChild(img);
            cell.addEventListener('click', handleMove);
            board.appendChild(cell);
        });
        statusText.innerText = `PLAYER ${currentPlayer} TURN`;
    }

    function handleMove(e) {
        const cell = e.currentTarget;
        const index = cell.dataset.index;

        if (gameState[index] !== '' || !gameActive) return;

        gameState[index] = currentPlayer;
        cell.classList.add('occupied');
        const img = cell.querySelector('img');
        img.src = symbols[currentPlayer];

        if (checkWin()) {
            statusText.innerText = `PLAYER ${currentPlayer} CONQUERED!`;
            gameActive = false;
        } else if (!gameState.includes('')) {
            statusText.innerText = "STALEMATE IN THE COSMOS";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.innerText = `PLAYER ${currentPlayer} TURN`;
        }
    }

    function checkWin() {
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                const cells = document.querySelectorAll('.cell');
                [a, b, c].forEach(idx => cells[idx].classList.add('winner'));
                return true;
            }
            return false;
        });
    }

    resetBtn.addEventListener('click', () => {
        currentPlayer = 'X';
        gameState = Array(9).fill('');
        gameActive = true;
        createBoard();
    });

    createBoard();
});
