<template>
  <div id="flop">
    <card-stack class="card-stack" v-if="flop.length === 0">
      <playing-card v-for="card in cards"
                    :key="card.card"
                    :card="card"/>
    </card-stack>
    <playing-card v-for="card in flop"
                  class="card-flop"
                  :key="card.card"
                  :card="card"/>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState:flopState,mapActions:flopActions} = createNamespacedHelpers('flop')

  export default {
    name: "FlopArea",
    computed:{
      ...flopState(['cards','flop']),
    },
    methods:{

    },
  }
</script>

<style scoped>
  #flop{
    display: grid;
    grid-template-columns: repeat(6, 1fr) 10px;
    grid-template-rows: 1fr;
    align-items: start;
  }
  .card-stack{
    grid-column: 1/span 3;
    grid-row-start: 1;
  }
  .card-flop:first-of-type{
    grid-column: 1/span 3;
    z-index: 1;
    position: relative;
    grid-row-start: 1;
  }
  .card-flop:nth-of-type(2){
    grid-column: 2/span 3;
    position: relative;
    grid-row-start: 1;
    z-index: 2;
  }
.card-flop:nth-of-type(3){
  grid-column: 3/span 3;
  position: relative;
  grid-row-start: 1;
  z-index: 2;
}
</style>