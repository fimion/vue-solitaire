<template>
  <button class="card"
          v-on="$listeners"
          v-bind="$attrs"
          :class="faceUp?'face-up':'face-down'"
          :aria-label="faceUp?name:'Face down card'">
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <g v-if="faceUp">
        <text
            x="5"
            y="1em"
            dy="0"
            class="upper corner"
            :class="color">
          {{rank}}{{symbol}}
        </text>
        <text
            x="10"
            y="1em"
            dy="50"
            :class="color">
          {{rank}} {{symbol}}
        </text>
        <text
            x="5"
            y="1em"
            transform="rotate(-180 50 75)"
            class="lower corner"
            :class="color">
          {{rank}}{{symbol}}
        </text>
      </g>
    </svg>
  </button>
</template>

<script>
  import Card from "../classes/Card.js"
  import EmptyCard from "../classes/EmptyCard.js"

  export default {
    name: "PlayingCard",
    props: {
      card: {
        type: [Card,EmptyCard],
        required: true,
      },
    },
    computed: {
      isEmpty(){
        return this.card.isEmpty
      },
      faceUp(){
        return this.card.faceUp
      },
      suit() {
        return this.card.suit
      },
      rank() {
        return this.card.rank
      },
      color() {
        return this.suit === 'H' || this.suit === 'D' ? 'red' : 'black'
      },
      symbol() {
        return this.card.symbol
      },
      name() {
        return this.card.readableName
      },
    },
  }
</script>

<style scoped>
  .card{
    font-size: 2.5rem;
    border: var(--color-black) solid 3px;
    border-radius: 0.5rem;
    max-width: 200px;
    cursor: pointer;
  }
  .card:focus{
    outline: var(--color-focus) 3px solid;
  }

  .face-up{
    background-color: var(--color-white);
  }
  .face-down{
    background-image: radial-gradient(circle, #1111aa, #111144);
  }
  .red {
    fill: var(--color-red);
  }
  .black {
    fill: var(--color-black);
  }
  svg{
    pointer-events: none;
    width:100%;
  }
  .corner{
    font-size:.25em;
  }
</style>