<template>
  <div id="app">
    <button class="shuffle-button"
            @click="shuffleDeck">
      Shuffle
    </button>
    <deck :deck="deck"></deck>
  </div>
</template>

<script>
  import Deck from "./components/Deck"
  import {createNamespacedHelpers} from "vuex"

  const {mapState: deckState, mapActions:deckActions} = createNamespacedHelpers('deck')

  export default {
    name: "app",
    data: function () {
      return {}
    },
    computed:{
      ...deckState({
        'deck': s=>s.cards,
      }),
    },
    methods: {
      ...deckActions([
          'shuffleDeck',
      ]),
    },
    components: {
      Deck,
    },
  }
</script>

<style lang="scss">
  * {
    --color-white: #e6e6e6;
    --color-black: #121212;
    --color-red: #ee1111;
    --color-focus: #1111ee;
    --playing-mat: #008800;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    background-color: var(--playing-mat)
  }

  #app {
    width: 99vw;
    background-color: var(--playing-mat);
    margin: 0;
    padding: 10px;
  }
</style>
