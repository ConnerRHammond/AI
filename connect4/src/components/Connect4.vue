<template>
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
								empty: column == 3, 
								red: column == 0, 
								yellow: column == 1
							}" 
							cx="25" 
							cy="25" 
							r="20"></circle>
				</svg>
			</div>
		</div>  
	</div>

  </template>
  
  <script>
	export default {
		name: 'App',
		components: {
		},
		data() {
			return {
				rowCount: 6,
				gameBoard:[],
				turn: 0,

			}
		},
		methods: {
			isValidColumn: function(column) {
				return this.gameBoard[0][column] == 3;
			},
			takeTurn: function(column) {
				if (this.isValidColumn(column)) {
					const row = this.getOpenRow(column);
					this.dropPiece(row, column, this.turn);
					this.turn = (this.turn + 1) % 2;
					console.log(this.gameBoard);
				}
			},
			createBoard: function() {
				return [[3,3,3,3,3,3,3],
						[3,3,3,3,3,3,3],
						[3,3,3,3,3,3,3],
						[3,3,3,3,3,3,3],
						[3,3,3,3,3,3,3],
						[3,3,3,3,3,3,3]]
			},
			getOpenRow: function(column) {
				for(let row = this.rowCount - 1; row >= 0; row --) {
					if (this.gameBoard[row][column] == 3) {
						return row;
					}
				}
			},
			dropPiece: function(row, column, color) {
				this.gameBoard[row][column] = color;
			}
		},
		computed: {
			board: function() {
				return this.gameBoard;
			}
		},
		created () {
			this.gameBoard = this.createBoard();
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
  circle.empty {
	fill: #fff;
  }
  circle.red {
	fill: #d50000;
  }
  circle.yellow {
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