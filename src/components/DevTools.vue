<template>
  <span class="devtools">
    <button @click="createWinCondition">Create Win Condition</button>
  </span>
</template>

<script>
import {CARD_RANKS, CARD_SUITS} from "@src/constants.js"
import Card from "@class/Card.js"

export default {
  name: "DevTools",
  methods:{
    createWinCondition(){
      this.$store.commit('flop/RESET_DECK')
      this.$store.commit('deck/RESET_CARDS')
      this.$store.state.play.stacks.forEach((e, i)=>{
        this.$store.commit(`play/${i}/RESET_CARDS`)
      })
      CARD_SUITS.forEach((suit)=>{
        CARD_RANKS.forEach((rank)=>{
          const card = new Card(rank, suit)
          card.faceUp = true
          this.$store.commit(`final/${suit}/PUSH_CARD`, card)
        })
      })
    },
  },
}
</script>

<style scoped>
.devtools {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
