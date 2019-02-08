<template>
  <div id="app">
    <deck-area />
    <flop-area />
  </div>
</template>

<script>
  import DeckArea from "./components/DeckArea"
  import FlopArea from "./components/FlopArea.vue"
  import {createNamespacedHelpers} from "vuex"

  const {
    mapActions:deckActions,
  } = createNamespacedHelpers('deck')

  export default {
    name: "app",
    data: function () {
      return {}
    },
    methods: {
      ...deckActions([
          'shuffleDeck',
      ]),
    },
    created(){
      this.shuffleDeck()
    },
    components: {
      DeckArea,
      FlopArea,
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
