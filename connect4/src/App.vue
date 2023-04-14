<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Connect4/>
  </div>
</template>

<script>
import Connect4 from './components/Connect4.vue'
import * as connect4Board from '@/connect4'
export default {
  name: 'App',
  components: {
    Connect4
  },
  data() {
    return {
      board: []
    }
  },
  created () {
    this.board = connect4Board.createBoard();
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
</style>
