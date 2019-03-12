<template>
  <button @click="startGame">
    <slot>Start a New Game</slot>
  </button>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: "new-game-button",
    methods:{
      startGame(){
        this.$emit('confirm')
        this.newGame()
      },
      ...mapActions(['newGame']),
    },
  }
</script>

<style scoped>

</style>