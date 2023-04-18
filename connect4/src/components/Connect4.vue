<template>
	<div>
		<h3> {{player}}</h3>
		<div class="wrapper">
			<div class="board">
				<div @click="takeTurn(columnIndex)"
					v-for="(column, columnIndex) in board[0]" 
					:key="'col-' + columnIndex" class="column" 
					:style="{left: columnIndex * 50 + 'px'}"></div>
				<div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
					<svg  
						v-for="(column, columnIndex) in row" 
						:key="columnIndex" 
						width="50" 
						height="50"
						>
							<circle 
								:class="{
									empty: column == 0, 
									red: column == 1, 
									yellow: column == 2
								}" 
								cx="25" 
								cy="25" 
								r="20"></circle>
					</svg>
				</div>
			</div> 
		</div>
	<input type="button" @click="newBoard" value="New Game">
	</div>
  </template>
  <script>
    import * as connect4 from '@/connect4'
	export default {
		name: 'App',
		components: {
		},
		data() {
			return {
				rowCount: 6,
				board:[],
				player1: 0,
				player2: 1,
				red: 1,
				yellow: 2,
				turn: 0,
				gameOver: false,
				AI: 2,
			}
		},
		computed: {
			player: function() {
				if (this.gameOver) {
					return 	this.turn % 2 == 1 ? 'Player 2 Won' : 'Player 1 Won';
				}
				return this.turn % 2 == 1 ? 'Player 2' : 'Player 1';

			},
		},
		methods: {
			selectBestColumn: function() {
				let validColumns = connect4.getValidColumns(this.board);
				let highestScore = -1000;
				let column = Math.floor(Math.random * validColumns.length);
				for (let i =0; i < validColumns.length; i++) {
					let newColumn = validColumns[i];
					let row = connect4.getOpenRow(this.board, newColumn);
					let boardCopy = connect4.copyBoard(this.board);
					connect4.dropPiece(boardCopy, row, newColumn, this.AI);
					let newScore = connect4.boardScore(boardCopy, this.AI, this.player1);
					if (newScore > highestScore) {
						highestScore = newScore;
						column = newColumn;
					}
				}
				return column;
			},
			newBoard: function() {
				this.board = connect4.createBoard();
				this.turn = 0;
				this.gameOver = false;
			},
			takeTurn: function(column) {
				if (connect4.isValidColumn(this.board, column) && !this.gameOver) {
					let row = connect4.getOpenRow(this.board, column);
					let color = this.turn == this.player1 ? this.red: this.yellow;
					connect4.dropPiece(this.board, row, column, color);
					this.gameOver = connect4.isWinningMove(this.board, color);
					if (!this.gameOver) {
						this.turn = (this.turn + 1) % 2;
						this.AITurn();
					}
				}
			},
			AITurn () {
				let column = this.selectBestColumn();
				let row = connect4.getOpenRow(this.board, column);
				connect4.dropPiece(this.board, row, column, this.AI);
				if (connect4.isWinningMove(this.board, this.yellow)) {
					this.gameOver = true;
				}
				this.turn = (this.turn + 1) % 2;
			}
		},
		created () {
			this.board = connect4.createBoard();
		}
		}
	</script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .row {
	display: flex;
    background-color: #0f55ff;
  }
  .wrapper {
    display: flex;
    justify-content: center;
  }
  .empty {
	fill: #fff;
  }
  .red {
	fill: #d50000;
  }
  .yellow {
	fill: #dad400;
  }
  .column {
	transition: background-color 0.1s ease-in-out;
	position: absolute;
	top: 0;
	width: 50px;
	height: 100%;
	background-color: transparent;
  }
  .column:hover {
	cursor: pointer;
	background-color: rgba(255, 222, 255, 0.2);
  }
  .board {
	position: relative;
  }
  </style>