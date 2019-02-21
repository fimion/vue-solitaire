<template>
  <div>
    <card-holder v-if="cards.length === 0">
      <base-svg></base-svg>
    </card-holder>
    <vertical-spread v-else>
      <playing-card v-for="card in cards"
                    :disabled="cardDisabled(card)"
                    @click="handleClick(card)"
                    :key="card.card"
                    :card="card"/>
    </vertical-spread>
  </div>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex'
  import {PlayStackAction} from "../class/Actions.js"

  export default {
    name: "PlayStack",
    props:{
      stack:{
        type:Number,
        required:true,
      },
    },
    computed:{
      cards(){
        return this.$store.state.play[this.stack].cards
      },
      bottomCard(){
        if(this.cards.length){
          return this.cards[this.cards.length-1]
        }
        return null
      },
      ...mapGetters(['selectedCard']),
    },
    methods:{
      cardDisabled(card){
        return !card.faceUp
      },
      handleClick(card){
        if(this.selectedCard){
          if(card.card === this.bottomCard.card){
            this.moveCards(new PlayStackAction(this.stack, card))
          }
        }

      },
      ...mapActions([
          'moveCards',
        "selectCards",
      ]),
    },
  }
</script>

<style scoped>

</style>