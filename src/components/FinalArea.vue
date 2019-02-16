<template>
  <div id="final">
    <final-stack suit="C" />
    <final-stack suit="D" />
    <final-stack suit="H" />
    <final-stack suit="S" />
  </div>
</template>
<script>
  import FinalStack from './FinalStack.vue'
  export default {
    name: "FinalArea",
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