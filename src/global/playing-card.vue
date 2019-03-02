<template>
  <button class="card"
          v-on="$listeners"
          v-bind="$attrs"
          :class="{'face-up': faceUp, 'face-down':!faceUp,}"
          :aria-label="faceUp?name:'Face down card'">
    <base-svg :class="{'selected':isSelected}">
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
            <template v-for="(ys, x) in symbols">
              <template v-for="(val, y) in ys">
                <use v-bind:xlink:href="'#'+suit"
                     v-if="displaySymbol(val)"
                     :key="card.card+x+y+'symbol-use'"
                     :x="Math.abs(x)"
                     :y="y"
                     :transform="upsideDown(x)"
                     height="20"
                     width="20"></use>
              </template>
            </template>
          </template>
        </g>


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
      symbols(){
        return {
          15:{
            20:[4,5,6,7,8,9,10],
            50:[9,10],
            65:[6,7,8],
          },
          40:{
            20:[2,3],
            35:[10],
            45:[7,8],
            65:['A',3,5,9],
          },
          65:{
            20:[4,5,6,7,8,9,10],
            50:[9,10],
            65:[6,7,8],
          },
          "-15":{
            20:[4,5,6,7,8,9,10],
            50:[9,10],
          },
          '-40':{
            20:[2,3],
            35:[10],
            45:[8],
          },
          '-65':{
            20:[4,5,6,7,8,9,10],
            50:[9,10],
          },
        }
      },
      isEmpty(){
        return this.card.isEmpty
      },
      isFaceCard(){
        return ['J','Q','K'].indexOf(this.rank)!==-1
      },
      isSelected(){
        let selection = this.$store.state.currentSelection
        if(selection){
          return selection.cards.filter((c)=>c.card === this.card.card).length > 0
        }
        return false
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
    methods:{
      upsideDown(x){
        if(x<0){
          return "rotate(-180 50 75)"
        }
        return ""
      },
      displaySymbol(arr){
        return arr.indexOf(this.rank)!=-1
      },
    },
  }
</script>

<style scoped>
  .card{
    border: var(--color-black) solid 3px;
    border-radius: 0.5rem;
    max-width: 100px;
    max-height:var(--card-height);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
    height:100%;
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
    box-shadow: 0 0 5px 3px var(--color-focus);
  }
  .symbol-pattern{
    font-size: 30px;
    line-height:30px;
  }

  svg.selected{
    fill: var(--color-selected);
    background-color: var(--color-selected);
  }

  text{
    user-select: none;
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