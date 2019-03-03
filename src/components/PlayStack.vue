<template>
  <div>
    <card-holder v-if="cards.length === 0"
                  @click="emptyClickHandler">
      <base-svg></base-svg>
    </card-holder>
    <vertical-spread v-else>
      <playing-card v-for="card in cards"
                    :disabled="cardDisabled(card)"
                    @click="clickHandler(card)"
                    @dblclick="dblClickHandler(card)"
                    :key="card.card"
                    :card="card"/>
    </vertical-spread>
  </div>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex'
  import {PlayStackAction, FinalStackAction, ClearSelectionAction} from "^class/Actions.js"
  import {PlaySelection} from "^class/Selections.js"
  import EmptyCard from "^class/EmptyCard.js"
  import {finalStackTopCardMethod} from "./_common.js"

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
      finalStackTopCardMethod,
      emptyClickHandler(){
        if(this.selectedCard){
          this.moveCards(new PlayStackAction(this.stack, new EmptyCard()))
        }
      },
      clickHandler(card){
        if(this.selectedCard){
          if(card.card === this.bottomCard.card){
            this.moveCards(new PlayStackAction(this.stack, card))
          }else{
            this.moveCards(new ClearSelectionAction())
          }
        }else{
          if(card.faceUp){
            let index = this.cards.indexOf(card),
                selection = this.cards.slice(index)
            this.selectCards(new PlaySelection(this.stack, selection))
          }
        }
      },
      dblClickHandler(card){
        if(this.bottomCard.card === card.card){
          this.selectCards(new PlaySelection(this.stack,[card]))
          this.moveCards(new FinalStackAction(card.suit, this.finalStackTopCardMethod(card.suit)))
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