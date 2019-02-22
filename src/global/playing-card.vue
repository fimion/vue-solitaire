<template>
  <button class="card"
          v-on="$listeners"
          v-bind="$attrs"
          :class="faceUp?'face-up':'face-down'"
          :aria-label="faceUp?name:'Face down card'">
    <base-svg>
      <symbol id="C" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
        <path d="M30 150C35 385 85 400 130 500L-130 500C-85 400 -35 385 -30 150A10 10 0 0 0 -50 150A210 210 0 1 1 -124 -51A10 10 0 0 0 -110 -65A230 230 0 1 1 110 -65A10 10 0 0 0 124 -51A210 210 0 1 1 50 150A10 10 0 0 0 30 150Z" fill="black"/>
      </symbol>
      <symbol id="D" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
        <path d="M-400 0C-350 0 0 -450 0 -500C0 -450 350 0 400 0C350 0 0 450 0 500C0 450 -350 0 -400 0Z" fill="red"/>
      </symbol>
      <symbol id="H" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
        <path d="M0 -300C0 -400 100 -500 200 -500C300 -500 400 -400 400 -250C400 0 0 400 0 500C0 400 -400 0 -400 -250C-400 -400 -300 -500 -200 -500C-100 -500 0 -400 -0 -300Z" fill="red"/>
      </symbol>
      <symbol id="S" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
        <path d="M0 -500C100 -250 355 -100 355 185A150 150 0 0 1 55 185A10 10 0 0 0 35 185C35 385 85 400 130 500L-130 500C-85 400 -35 385 -35 185A10 10 0 0 0 -55 185A150 150 0 0 1 -355 185C-355 -100 -100 -250 0 -500Z" fill="black"/>
      </symbol>
      <g v-if="faceUp">
        <g class="upper corner">
          <text
              x="5"
              y="15"
              textLength="8"
              lengthAdjust="spacingAndGlyphs"
              class="upper corner"
              :class="color">{{rank}}</text>
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
                y="85"
                textLength="20"
                lengthAdjust="spacingAndGlyphs"
                class="face-card">
              {{rank}}
            </text>
          </template>
          <template v-else>
            <template v-for="(ys, x) in symbols">
              <template v-for="(val, y) in ys">
                <!--<text v-if="displaySymbol(val)"-->
                <!--:key="card.card+x+y+'symbol'"-->
                <!--textLength="20"-->
                <!--lengthAdjust="spacingAndGlyphs"-->
                <!--:x="Math.abs(x)"-->
                <!--:y="y"-->
                <!--:transform="upsideDown(x)"-->
                <!--:class="color">-->
                <!--{{symbol}}-->
                <!--</text>-->
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
        <g class="lower-corner"
           transform="rotate(-180 50 75)">
          <text
              x="5"
              y="15"
              textLength="8"
              lengthAdjust="spacingAndGlyphs"
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
    outline: none;
    box-shadow: 0 0 5px 3px var(--color-focus);
  }
  .symbol-pattern{
    font-size: 30px;
    line-height:30px;
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
    font-size:12px;
  }
  .face-card{
    fill:var(--color-white);
    font-size:50px;
  }
  .face-card.club{
    font-size: 30px;
  }
</style>