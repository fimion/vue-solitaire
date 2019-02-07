<template>
  <div class="deck">
    <button class="shuffle-button"
            @click="shuffleDeck">
      Shuffle
    </button>
    <playing-card v-for="card in deck"
                  :card="card"
                  :key="card" />
  </div>
</template>

<script>
  import PlayingCard from './PlayingCard'
export default {
  name: "Deck",
  data(){
    let cards = ['A',1,2,3,4,5,6,7,8,9,'J','Q','K'],
      suits = ['H','C','S','D'],
      deck = suits.map((suit)=>cards.map((card)=>card+suit))
    return {
      deck:deck.flat(),
    }

  },
  methods:{
    shuffleDeck(){
      this.deck = this.deck.sort(()=>(Math.random() - 0.5))
    },
  },
  components:{
    PlayingCard,
  },
};
</script>

<style scoped>
.deck {
  display: grid;
  grid-template-columns: repeat(4, minmax(20px, 200px));
  grid-auto-rows: 1fr;
  grid-gap: 8px;

}
</style>
