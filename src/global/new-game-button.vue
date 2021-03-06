<script>
import {mapActions} from 'vuex'
export default {
  name: "NewGameButton",
  emits:['confirm'],
  methods:{
    startGame(){
      this.$emit('confirm')
      this.newGame()
    },
    ...mapActions(['newGame']),
  },
}
</script>
<template>
  <button @click="startGame">
    <slot>Start a New Game</slot>
  </button>
</template>
<style scoped>

</style>
