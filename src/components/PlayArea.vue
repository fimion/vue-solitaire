<template>
  <div id="play">
    <play-stack v-for="(val, i) in stacks"
                     :stack="i"
                     :key="'play-stack'+i"/>
  </div>
</template>

<script>
  import PlayStack from '^components/PlayStack.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState:playState} = createNamespacedHelpers('play')
  export default {
    name: "PlayArea",
    computed:{
      ...playState(['stacks']),
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