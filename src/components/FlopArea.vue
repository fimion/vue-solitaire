<template>
  <div class="flop-area">
    <card-stack class="card-stack">
      <playing-card v-for="card in cardStack"
                    :key="card.card"
                    :card="card"/>
    </card-stack>
    <playing-card v-for="card in cardFlop"
                  class="card-flop"
                  :key="card.card"
                  :card="card"/>
  </div>
</template>

<script>
  import CardStack from './CardStack.vue'
  import PlayingCard from './PlayingCard.vue'

  import {createNamespacedHelpers} from 'vuex'

  const {mapState:flopState,mapActions:flopActions} = createNamespacedHelpers('flop')

  export default {
    name: "FlopArea",
    computed:{
      ...flopState(['cards']),
      cardStack(){
        if(this.cards.length < 2){
          return this.cards
        }else if(this.cards.length < 3){
          return this.cards.slice(0,this.cards.length - 1)
        }
        return this.cards.slice(0,this.cards.length - 2)
      },
      cardFlop(){
        if(this.cards.length < 2){
          return []
        }else if(this.cards.length < 3){
          return this.cards.slice(this.cards.length - 1,this.cards.length)
        }
        return this.cards.slice(this.cards.length - 2,this.cards.length)
      },
    },
    methods:{

    },
    components:{
      CardStack,
      PlayingCard,
    },

  }
</script>

<style scoped>
.flop-area{
  grid-column: 2/span 2;
  grid-row:1/1;
  display: grid;
  grid-template-columns: repeat(6, 1fr) 10px;
  grid-template-rows: 1fr;
}

  .card-stack{
    grid-column: 1/span 3;
    grid-row: 1/1;
  }
  .card-flop:first-of-type{
    grid-column: 2/span 3;
    z-index: 1;
    position: relative;
    grid-row: 1/1;
  }
  .card-flop:nth-of-type(2){
    grid-column: 3/span 3;
    position: relative;
    grid-row: 1/1;
    z-index: 2;
  }
</style>