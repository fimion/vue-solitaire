<template>
  <div class="deck">
    <playing-card v-for="(card,i) in deck"
                  @click="flipCard(i)"
                  :card="card"
                  :key="card.card"/>
  </div>
</template>

<script>
  import PlayingCard from './PlayingCard'
  import {createNamespacedHelpers} from 'vuex'
  const  {mapActions:deckActions}= createNamespacedHelpers('deck')
  export default {
    name: "Deck",
    props: {
      deck: {
        type: Array,
        required: true,
      },
    },
    methods:{
      ...deckActions([
          'flipCard',
      ]),
    },
    components: {
      PlayingCard,
    },
  }
</script>

<style scoped>
  .deck {
    display: grid;
    grid-template-columns: repeat(4, minmax(20px, 200px));
    grid-auto-rows: 1fr;
    grid-gap: 8px;
  }
</style>
