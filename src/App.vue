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

  export default {
    name: "app",
    data: function () {
      let cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'],
          suits = ['H', 'C', 'S', 'D'],
          deck = suits.map((suit) => {
                return cards.map((card) => card + suit)
              })
              .flat()
              .map((e) => {
                return {faceUp: false, card: e}
              })

      return {
        deck: deck,
      }
    },
    methods: {
      shuffleDeck() {
        this.deck = this.deck.sort(() => (Math.random() - 0.5))
      },
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
