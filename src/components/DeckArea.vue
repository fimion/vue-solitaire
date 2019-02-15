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
  import {createNamespacedHelpers} from 'vuex'

  const {mapActions: deckActions, mapGetters: deckGetters} = createNamespacedHelpers('deck')
  export default {
    name: "Deck",
    computed: {
      ...deckGetters(['topCard', 'deckEmpty']),
    },
    methods: {
      ...deckActions([
        'flipCard',
        'resetDeck',
      ]),
    },
  }
</script>

<style scoped>
  .deck {

  }
</style>
