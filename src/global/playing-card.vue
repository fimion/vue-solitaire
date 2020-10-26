<template>
  <button class="card"
          v-bind="$attrs"
          :class="{'face-up': faceUp, 'face-down':!faceUp,'selected':isSelected}"
          :aria-label="faceUp?name:'Face down card'">
    <base-svg>
      <g v-if="faceUp">
        <g class="upper corner">
          <text
              x="10"
              y="17"
              text-anchor="middle"
              class="upper corner"
              :class="color">{{rank}}</text>
          <use v-bind:xlink:href="'#'+suit"
               x="5"
               y="20"
               height="10"
               width="10"></use>
        </g>
        <g class="lower-corner"
           transform="rotate(-180 50 75)">
          <text
              x="10"
              y="17"
              text-anchor="middle"
              class="lower corner"
              :class="color">
            {{rank}}
          </text>
          <use v-bind:xlink:href="'#'+suit"
               x="5"
               y="20"
               height="10"
               width="10"></use>
        </g>
        <g class="symbol-pattern">
          <template v-if="isFaceCard">
            <use v-bind:xlink:href="'#'+suit"
                 x="5"
                 y="30"
                 height="90"
                 width="90"></use>
            <template v-if="suit==='C'">
              <text
                  x="40"
                  y="60"
                  textLength="20"
                  lengthAdjust="spacingAndGlyphs"
                  class="face-card club">
                {{rank}}
              </text>
            </template>
            <text v-else
                x="40"
                y="90"
                textLength="20"
                lengthAdjust="spacingAndGlyphs"
                class="face-card">
              {{rank}}
            </text>
          </template>
          <template v-else>
            <use v-bind:xlink:href="'#'+suit"
                 v-for="pos in symbols"
                 :key="card.card+pos.x+pos.y+pos.transform+'symbol-use'"
                 :x="pos.x"
                 :y="pos.y"
                 :transform="pos.transform"
                 height="20"
                 width="20"></use>
          </template>
        </g>
      </g>
    </base-svg>
  </button>
</template>

<script>
  import Card from "@/class/Card.js"
  import EmptyCard from "@/class/EmptyCard.js"
  import {SUIT_RED} from "@/constants.js"

  function Pos(x,y,flip) {
    return {
      x,
      y,
      transform: flip ? "rotate(-180 50 75)" : "",
    }
  }

  const L ={
      A:Pos(15,20),
      D:Pos(15, 50),
      E:Pos(15,65),
      F:Pos(65, 50, true),
      I:Pos(65, 20, true),
    },
    C = {
      A:Pos(40, 20),
      B:Pos(40, 35),
      C:Pos(40, 45),
      E:Pos(40, 65),
      G:Pos(40, 45, true),
      H:Pos(40, 35, true),
      I:Pos(40, 20, true),
    },
    R = {
      A:Pos(65, 20),
      D:Pos(65, 50),
      E:Pos(65, 65),
      F:Pos(15, 50, true),
      I:Pos(15, 20, true),
    }


const DISPLAY_PATTERNS = {
    "A": [C.E],
    "2": [C.A, C.I],
    "3": [C.A, C.E, C.I],
    "4": [L.A, L.I, R.A, R.I],
    "5": [L.A, L.I, C.E, R.A, R.I],
    "6": [L.A, L.E, L.I, R.A, R.E, R.I],
    "7": [L.A, L.E, L.I, C.C, R.A, R.E, R.I],
    "8": [L.A, L.E, L.I, C.C, C.G, R.A, R.E, R.I],
    "9": [L.A, L.D, L.F, L.I, C.E, R.A, R.D, R.F, R.I],
    "10":[L.A, L.D, L.F, L.I,C.B, C.H, R.A, R.D, R.F, R.I],

  }

  export default {
    name: "PlayingCard",
    props: {
      card: {
        type: [Card,EmptyCard],
        required: true,
      },
      isSelected:{
        type: Boolean,
        required: true,
      },
    },
    computed: {
      symbols(){
        return DISPLAY_PATTERNS[this.card.rank]
      },
      isEmpty(){
        return this.card.isEmpty
      },
      isFaceCard(){
        return ['J','Q','K'].indexOf(this.rank)!==-1
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
        return SUIT_RED.has(this.suit) ? 'red' : 'black'
      },
      symbol() {
        return this.card.symbol
      },
      name() {
        return this.card.readableName
      },
    },
    methods:{
      upsideDown(x){
        if(x<0){
          return "rotate(-180 50 75)"
        }
        return ""
      },
      displaySymbol(arr){
        return arr.indexOf(this.rank)!==-1
      },
    },
  }
</script>

<style scoped>
  .card{
    border: var(--color-card-border) solid 3px;
    border-radius: 0.5rem;
    max-width: 100px;
    max-height:var(--card-height);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
    height:100%;
    position:relative;
    transition: box-shadow 0.2s ease, filter 0.2s ease, border-color 0.2s ease;
  }
  @media screen and (min-width:768px) {
    .card{
      max-height: 150px;
    }
  }
  .card[disabled]{
    cursor:default;
  }
  .card:focus{
    outline: none;
    box-shadow: 0 0 3px 2px var(--color-focus);
  }
  .symbol-pattern{
    font-size: 30px;
    line-height:30px;
  }

  .card.selected{
    border-color: var(--color-selected-border);
    box-shadow: var(--box-height-3);
  }
  .card::before{
    display:block;
    pointer-events: none;
    z-index: 5;
    background: var(--color-selected);
    height:100%;
    width:100%;
    content:'';
    position:absolute;
    top:0;
    left:0;
    opacity:0;
    transition: opacity 0.2s ease;
  }
  .card.selected::before{
    opacity:1;
  }

  text{
    user-select: none;
  }

  .face-up{
    background: var(--color-white);
  }
  .face-down{
    background: var(--card-back);
  }
  .red {
    fill: var(--color-red);
  }
  .black {
    fill: var(--color-black);
  }
  .corner{
    font-size:18px;
  }
  .face-card{
    fill:var(--color-white);
    font-size:50px;
  }
  .face-card.club{
    font-size: 30px;
  }
</style>
