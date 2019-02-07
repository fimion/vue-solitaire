<template>
  <div class="deck">
    <playing-card v-for="card in deck"
                  :card="card"
                  :key="card"/>
  </div>
</template>

<script>
  import PlayingCard from './PlayingCard'

  export default {
    name: "Deck",
    props: {
      deck: {
        type: Array,
        required: true,
      },
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
