<template>
  <button class="card"
          v-on="$listeners"
          v-bind="$attrs"
          :class="faceUp?'face-up':'face-down'"
          :aria-label="faceUp?name:'Face down card'">
    <base-svg>
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
    </base-svg>
  </button>
</template>

<script>
  import Card from "../class/Card.js"
  import EmptyCard from "../class/EmptyCard.js"
  import {SUIT_RED, SUIT_BLACK} from "../constants.js"

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
        return SUIT_RED.indexOf(this.suit)!==-1 ? 'red' : 'black'
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
    max-width: 100px;
    max-height:150px;
    cursor: pointer;
  }
  .card[disabled]{
    cursor:default;
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
  .corner{
    font-size:15px;
  }
</style>