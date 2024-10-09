const rows = 10;
const cols = 12;
let currentRow, currentCol;
let avatar;
const board = Array.from({ length: rows }, () => new Array(cols).fill(0));
let totalBallsAdded = 0;
let intervalId;


// creates the base board game
function createTable(rows, cols) {
    const table = document.createElement('table');
    table.id = 'table'

    for (let i = 0; i < rows; i++) {
        let halfRows = Math.floor(rows / 2);
        let halfCols = Math.floor(cols / 2)
        const row = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
            if (i == 0 || j == 0 || i == rows - 1 || j == cols - 1)
                cell.style.backgroundColor = 'purple';
            else
                cell.style.backgroundColor = 'lightgrey';
            // break a way out
            if (((i == 0 || i == rows - 1) && (j == halfCols || j == halfCols + 1)) || ((i == halfRows || i == halfRows + 1) && (j == 0 || j == cols - 1))) {
                cell.style.backgroundColor = 'white';
                cell.style.border = 'none'
            }
            table.appendChild(row);
        }
        document.getElementById('tableContainer').appendChild(table);
    }
}

// starts the game 
function startGame() {
    const table = document.getElementById('table');

    avatar = document.createElement('img');
    avatar.src = "./Assets/avatar.png";
    avatar.style.width = "35px";
    avatar.style.height = "35px";

    [currentRow, currentCol] = randomCell(); // global varaibles

    let targetCell = table.rows[currentRow].cells[currentCol];
    targetCell.appendChild(avatar);

    document.addEventListener('keydown', function (event) {
        moveAvatar(event);
    });

    intervalId = setInterval(addBall, 3000);

}

// move the avatar due to user input
function moveAvatar(event) {
    if (!avatar.parentNode) return;
    const table = document.getElementById('table');

    table.rows[currentRow].cells[currentCol].removeChild(avatar);

    switch (event.key) {
        case 'ArrowUp':
            if (currentRow > 1) currentRow--;
            break;
        case 'ArrowDown':
            if (currentRow < rows - 2) currentRow++;
            break;
        case 'ArrowLeft':
            if (currentCol > 1) currentCol--;
            break;
        case 'ArrowRight':
            if (currentCol < cols - 2) currentCol++;
            break;
        default:
            break;
    }

    // switch(currentCol){
    //     case 0:
    //         if(currentRow==)
    // }
    let newCell = table.rows[currentRow].cells[currentCol];
    if (board[currentRow][currentCol] == 1)
        removeBall(currentRow, currentCol);

    newCell.appendChild(avatar);
}


// randoms a cell in the table
function randomCell() {
    const row = Math.floor(Math.random() * (rows - 2) + 1);
    const col = Math.floor(Math.random() * (cols - 2) + 1);
    return [row, col]

}

// adds a new ball
function addBall() {
    const table = document.getElementById('table');
    const [randomRow, randomCol] = randomCell();

    const ball = document.createElement('img');
    ball.src = "./Assets/ball.png";
    ball.style.width = "35px";
    ball.style.height = "35px";

    const targetCell = table.rows[randomRow].cells[randomCol];
    if (board[randomRow][randomCol] != 1) {
        board[randomRow][randomCol] = 1;
        targetCell.appendChild(ball);
        totalBallsAdded++
    }
}

// removes a ball 
function removeBall(row, col) {
    const table = document.getElementById('table');
    const targetCell = table.rows[row].cells[col];
    const ball = targetCell.querySelector('img');

    if (ball && ball.src.includes('ball.png')) {

        targetCell.removeChild(ball);
        board[row][col] = 0;
    }
    checkWinCondition();
}

// checks winning
function checkWinCondition() {
    const isBoardEmpty = board.flat().every(cell => cell === 0);

    if (isBoardEmpty && totalBallsAdded >= 5) {
        clearInterval(intervalId);
        alert("You win! All balls have been removed!");
    }
}

// restart a new game
function restartGame() {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ''; // Remove existing table
    clearInterval(intervalId);
    totalBallsAdded = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            board[i][j] = 0;
        }
    }
    createTable(rows, cols);
    startGame();
}
// createTable(10, 12);
// startGame()
