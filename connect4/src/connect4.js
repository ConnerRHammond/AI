const RowCount = 6;
const ColumnCount = 6;
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