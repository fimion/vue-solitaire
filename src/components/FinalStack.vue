<template>
  <card-stack>
    <card-holder @click="handleClick"
                 v-if="deckEmpty">
      <base-svg>
        <use v-bind:xlink:href="'#'+suit+'W'"
             class="placeholder"
             x="0"
             y="25"
             height="100"
             width="100"></use>
      </base-svg>
    </card-holder>
    <playing-card v-else
                  @click="handleClick"
                  :card="topCard" />
  </card-stack>
</template>

<script>
  import {SUIT_SYMBOLS} from "^/constants.js"
  import {FinalStackAction} from "../class/Actions.js"

  export default {
    name: "FinalStack",
    computed:{
      symbol(){
        return SUIT_SYMBOLS[this.suit]
      },
      topCard(){
        return this.$store.getters['final/'+this.suit+'/topCard']
      },
      deckEmpty(){
        return this.$store.getters['final/'+this.suit+'/deckEmpty']
      },
    },
    props:{
      suit:{
        type:String,
        required:true,
      },
    },
    methods:{
      handleClick(){
        if(this.$store.getters.selectedCard){
          this.$store.dispatch("moveCards", new FinalStackAction(this.suit, this.topCard))
        }
      },
    },
  }
</script>

<style scoped>
>>>symbol>.suit{
  fill:var(--color-white)!important;
}
</style>