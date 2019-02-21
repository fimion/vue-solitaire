<template>
  <div id="flop">
    <card-stack class="card-stack" v-if="flop.length === 0">
      <playing-card v-for="card in cards"
                    :disabled="!isTopCard(card)"
                    :key="card.card"
                    :card="card"/>
    </card-stack>
    <playing-card v-for="card in flop"
                  :disabled="!isTopCard(card)"
                  @click="selectFlopCard(card)"
                  class="card-flop"
                  :key="card.card"
                  :card="card"/>
  </div>
</template>

<script>
  import {createNamespacedHelpers,mapActions} from 'vuex'
  import {FlopSelection} from "../class/Selections.js"

  const {mapState:flopState, mapGetters:flopGetters} = createNamespacedHelpers('flop')

  export default {
    name: "FlopArea",
    computed:{
      ...flopState(['cards','flop']),
      ...flopGetters(['topCard']),
    },
    methods:{
      isTopCard(card){
        return card.card === this.topCard.card
      },
      selectFlopCard(card){
        this.selectCards(new FlopSelection(card))
      },
      ...mapActions(['selectCards']),
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