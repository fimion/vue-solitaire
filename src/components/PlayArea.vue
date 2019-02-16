<template>
  <div id="play">
    <play-stack v-for="(val, i) in playStacks"
                     :stack="i"
                     :key="'play-stack'+i"/>
  </div>
</template>

<script>
  import PlayStack from '^components/PlayStack.vue'
  let PLAY_STACKS = []
  PLAY_STACKS.length = 7
  PLAY_STACKS.fill(null)
  export default {
    name: "PlayArea",
    computed:{
      playStacks(){
        return PLAY_STACKS
      },
    },
    components:{
      PlayStack,
    },
  }
</script>

<style scoped>
  #play{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column-gap: 10px;
    grid-template-rows: 1fr;
    align-items: start;
  }
</style>