<template>
  <div id="final">
    <final-stack v-for="suit in stacks"
                 :key="'final-stack-'+suit"
                 :suit="suit" />
  </div>
</template>
<script>
  import FinalStack from './FinalStack.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState:finalState} = createNamespacedHelpers('final')
  export default {
    name: "FinalArea",
    computed:{
      ...finalState([
          'stacks',
      ]),
    },
    components:{
      FinalStack,
    },
  }
</script>

<style scoped>
  #final{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 10px;
    grid-template-rows: 1fr;
    align-items: start;
  }
</style>