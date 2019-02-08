<template>
  <div class="deck">
    <card-stack>
    <playing-card v-for="(card,i) in deck"
                  @click="flipCard(i)"
                  :card="card"
                  :key="card.card"/>
    </card-stack>
  </div>
</template>

<script>
  import PlayingCard from './PlayingCard'
  import CardStack from './CardStack.vue'
  import {createNamespacedHelpers} from 'vuex'
  const  {mapActions:deckActions,mapState:deckState}= createNamespacedHelpers('deck')
  export default {
    name: "Deck",
    computed:{
      ...deckState({
        'deck': s=>s.cards,
      }),
    },
    methods:{
      ...deckActions([
          'flipCard',
      ]),
    },
    components: {
      PlayingCard,
      CardStack,
    },
  }
</script>

<style scoped>
  .deck {

  }
</style>
