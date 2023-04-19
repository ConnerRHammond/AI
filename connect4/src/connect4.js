const RowCount = 6;
const ColumnCount = 7;
const Yellow = 2;
const Red = 1;
const Empty = 0;

function count (inputArray, item) {
    const map = inputArray.reduce((acc, key) => acc.set(key, (acc.get(key) || 0) + 1), new Map());
    return map.get(item) || 0;
}
export function isValidColumn(gameBoard, column) {
    return gameBoard[0][column] == 0;
} 

export function takeTurn(gameBoard, column) {
    if (this.isValidColumn(column)) {
        const row = this.getOpenRow(column);
        this.dropPiece(row, column, this.turn);
        this.turn = (this.turn + 1) % 2;
        console.log(gameBoard);
    }
}
export function createBoard() {
    return [[0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]]
}
export function getOpenRow(gameBoard,column) {
    for(let row = 5; row >= 0; row --) {
        if (gameBoard[row][column] == 0) {
            return row;
        }
    }
}
export function getValidColumns(gameBoard) {
    let validColumn = [];
    for (let column = 0; column < ColumnCount; column++) {
        if (isValidColumn(gameBoard, column)) {
            validColumn.push(column);
        }
    }
    return validColumn;
}

export function copyBoard(gameBoard) {
   return JSON.parse(JSON.stringify(gameBoard));
}
function getScore(section, color = 2, oppositeColor = 1) {
    let score = 0;
    if (count(section, color) == 4) {
        score += 100;
    }
    if (count(section, color) == 3 && count(section, Empty) == 1){
        score += 10;
    }
    if (count(section, color) == 2 && count(section, Empty) == 2){
        score += 5;
    }
    if (count(section, oppositeColor) == 3 && count(section, Empty) == 1){
        score -= 80;
    }
    return score
}

export function minimax(board, depth, alpha, beta, maximizingPlayer) {
    let isTerminal = isWinningMove(board, Red) || isWinningMove(board, Yellow) || getValidColumns(board).length == 0;
    if (isTerminal || depth == 0) {
        if (isTerminal) {
            if (isWinningMove(board, Red)) {
                return {
                    score: -10000,
                    column: undefined
                };
            }
            if (isWinningMove(board, Yellow)) {
                return {
                    score: 10000,
                    column: undefined
                };
            }
            return {
                score: 0,
                column: undefined
            };
        } else {
            return {
                score: boardScore(board),
                column: undefined
            };
        }
    }

    let validColumns = getValidColumns(board);
    if (maximizingPlayer) {
        let score = -Infinity;
        let column = Math.floor(Math.random() * validColumns.length);
        for (let i = 0; i < validColumns.length; i++) {
            let newColumn = validColumns[i];
            let row = getOpenRow(board, newColumn);
            let boardCopy = copyBoard(board);
            dropPiece(boardCopy, row, newColumn, Yellow);
            let result = minimax(boardCopy, depth - 1, alpha, beta, false);
            let newScore = result.score;
            if (newScore > score) {
                score = newScore;
                column = newColumn;
            }
            alpha = Math.max(alpha, score);
            if (alpha >= beta) {
                break;
            }
        }
        return {
            score: score,
            column: column
        };
    } else {
        let score = Infinity;
        let column = Math.floor(Math.random() * validColumns.length);
        for (let i = 0; i < validColumns.length; i++) {
            let newColumn = validColumns[i];
            let row = getOpenRow(board, newColumn);
            let boardCopy = copyBoard(board);
            dropPiece(boardCopy, row, newColumn, Red);
            let result = minimax(boardCopy, depth - 1, alpha, beta, true);
            let newScore = result.score;
            if (newScore < score) {
                score = newScore;
                column = newColumn;
            }
            beta = Math.min(beta, score);
            if (alpha >= beta) {
                break;
            }
        }
        return {
            score: score,
            column: column
        };
    }
}

export function boardScore(gameBoard, color = 2) {
    let score = 0;
    let centerColumnArray = [];
    let centerColumn = Math.floor(ColumnCount / 2);
    for (let row =0; row < RowCount; row++) {
        centerColumnArray.push(gameBoard[row][centerColumn])
    }
    let centerPieces = count(centerColumnArray, color);
    score += centerPieces * 6;
    //score Rows
    gameBoard.forEach(row => {
        for (let column = 0; column < ColumnCount - 3; column ++) {
            let section = row.slice(column, column + 4);
            score += getScore(section);
        }
    });

    //score Columns
    for (let column = 0; column < ColumnCount; column ++) {
        let columnArray = [];
        for (let row = RowCount -1; row >= 0; row --) {
            columnArray.push(gameBoard[row][column]);
        }
        for (let row = 0; row < RowCount - 3; row ++) {
            let section = columnArray.slice(row, row +4);
            score += getScore(section);
        }
    }
    // score upwards diagonals
    for (let row = RowCount -1; row >= RowCount - 3; row --) {
        for (let column = 0; column < ColumnCount - 3; column ++) {
            let section = [];
            for (let i = 0; i < 4; i++) {
                section.push(gameBoard[row - i][column + i]);
            }
            score += getScore(section);
        }
    }

    //score downwards diagonals
    for (let row = 0; row < RowCount -3; row ++) {
        for (let column = 0; column < ColumnCount - 3; column ++) {
            let section = [];
            for (let i = 0; i < 4; i++) {
                section.push(gameBoard[row + i][column + i]);
            }
            score += getScore(section);
        }
    }
    return score;
}

export function dropPiece(gameBoard, row, column, color) {
    gameBoard[row][column] = color;
}
export function isWinningMove(gameBoard, color) {
    for (let c = 0; c < ColumnCount - 3; c++) {
        for (let r = 0; r < RowCount; r++) {
            if (
                gameBoard[r][c] == color && 
                gameBoard[r][c + 1] == color && 
                gameBoard[r][c + 2] == color && 
                gameBoard[r][c + 3] == color
            ) {
                return true;
            }
        }
    }

    for (let c = 0; c < ColumnCount; c++) {
        for (let r = RowCount -1; r >= RowCount - 3; r--) {
            if (
                gameBoard[r][c] == color && 
                gameBoard[r - 1][c] == color && 
                gameBoard[r - 2][c] == color && 
                gameBoard[r - 3][c] == color
            ) {
                return true;
            }
        }
    }
    // upward diagonals
    for (let c = 0; c < ColumnCount - 3; c++) {
        for (let r = RowCount -1; r >= RowCount - 3; r--) {
            if (
                gameBoard[r][c] == color && 
                gameBoard[r - 1][c + 1] == color && 
                gameBoard[r - 2][c + 2] == color && 
                gameBoard[r - 3][c + 3] == color
            ) {
                return true;
            }
        }
    }

    // downward diagonals
    for (let c = 0; c < ColumnCount - 3; c++) {
        for (let r = 0; r < RowCount - 3; r++) {
            if (
                gameBoard[r][c] == color &&
                gameBoard[r + 1][c + 1] == color &&
                gameBoard[r + 2][c + 2] == color &&
                gameBoard[r + 3][c + 3] == color
            ) {
                return true;
            }
        }
    }
}