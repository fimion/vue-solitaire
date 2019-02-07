<template>
  <button class="playing-card"
          :aria-label="name">
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="1em" dy="50" :class="color">{{rank}} {{symbol}}</text>
    </svg>
  </button>
</template>

<script>
  export default {
    name: "PlayingCard",
    props: {
      card: {
        type: Object,
        required: true,
      },
    },
    computed: {
      suit() {
        return this.card.card[this.card.card.length-1]
      },
      rank() {
        return this.card.card.slice(0,this.card.card.length-1)
      },
      color() {
        return this.suit === 'H' || this.suit === 'D' ? 'red' : 'black'
      },
      symbol() {
        return {
          'H': '♥',
          'D': '♦',
          'C': '♣',
          'S': '♠',
        }[this.suit]
      },
      name() {
        let suitnames = {
              'H': 'Hearts',
              'D': 'Diamonds',
              'C': 'Clubs',
              'S': 'Spades',
            },
            cardNames = {
              'A': 'Ace',
              '2': 'Two',
              '3': 'Three',
              '4': 'Four',
              '5': 'Five',
              '6': 'Six',
              '7': 'Seven',
              '8': 'Eight',
              '9': 'Nine',
              '10': 'Ten',
              'J': 'Jack',
              'Q': 'Queen',
              'K': 'King',
            }


        return cardNames[this.rank] + ' of ' + suitnames[this.suit]
      },
    },
  }
</script>

<style scoped>
  .playing-card {
    font-size: 2.5rem;
    background-color: var(--color-white);
    border: var(--color-black) solid 3px;
    border-radius: 0.5rem;
  }

  .playing-card:focus{
    outline: var(--color-focus) 3px solid;
  }

  .red {
    fill: var(--color-red);
  }

  .black {
    fill: var(--color-black);
  }
</style>