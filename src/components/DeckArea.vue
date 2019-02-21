<template>
  <div id="deck">
    <card-stack>
      <card-holder v-if='deckEmpty'
                   @click="resetDeck"/>
      <playing-card v-else
                    @click="flipCard"
                    :card="topCard"
                    :key="topCard.card"/>
    </card-stack>
  </div>
</template>

<script>
  import {createNamespacedHelpers, mapActions} from 'vuex'

  import {CardFlopAction, DeckResetAction} from "../class/Actions.js"

  const {mapGetters: deckGetters} = createNamespacedHelpers('deck')
  export default {
    name: "Deck",
    computed: {
      ...deckGetters(['topCard', 'deckEmpty']),
    },
    methods: {
      flipCard(){
        this.moveCards(new CardFlopAction())
      },
      resetDeck(){
        this.moveCards(new DeckResetAction())
      },
      ...mapActions(['moveCards']),
    },
  }
</script>

<style scoped>
  .deck {

  }
</style>
