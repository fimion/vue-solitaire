<template>
  <drop @drop="dropHandler">
    <card-holder v-if="cards.length === 0"
                  @click="emptyClickHandler">
      <base-svg></base-svg>
    </card-holder>
    <vertical-spread v-else>
      <template v-for="card in cards">
        <drag-wrapper v-if="card.faceUp"
                      class="face-up"
                      @dragstart="dragStartHandler(card)"
                      @dragend="dragEndHandler(card)"
                      :key="'DragWrapper'+card.card">
          <playing-card :disabled="cardDisabled(card)"
                        v-if="displayCard(card)"
                        @click="clickHandler(card)"
                        @dblclick="dblClickHandler(card)"
                        :key="card.card"
                        :card="card"/>
        </drag-wrapper>
        <playing-card v-else
            :disabled="cardDisabled(card)"
            @click="clickHandler(card)"
            @dblclick="dblClickHandler(card)"
            :key="card.card"
            :card="card"/>
      </template>

    </vertical-spread>
  </drop>
</template>

<script>

  import {mapActions, mapGetters, mapState} from 'vuex'
  import {PlayStackAction, FinalStackAction, ClearSelectionAction} from "^class/Actions.js"
  import {PlaySelection} from "^class/Selections.js"
  import EmptyCard from "^class/EmptyCard.js"
  import {Drop} from "vue-drag-drop"
  import {finalStackTopCardMethod, cardIsSelected} from "./_common.js"

  export default {
    name: "PlayStack",
    props:{
      stack:{
        type:Number,
        required:true,
      },
    },
    components:{Drop},
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
      ...mapState(['dragging']),
      ...mapGetters(['selectedCard']),
    },
    methods:{
      cardDisabled(card){
        return !card.faceUp
      },
      finalStackTopCardMethod,
      cardIsSelected,
      emptyClickHandler(){
        if(this.selectedCard){
          this.moveCards(new PlayStackAction(this.stack, new EmptyCard()))
        }
      },
      displayCard(card){
        let selected = this.cardIsSelected(card)
        return !(selected && this.dragging)

      },
      dragStartHandler(card){
        let index = this.cards.indexOf(card),
            selection = this.cards.slice(index)
        this.selectCards(new PlaySelection(this.stack, selection))
        this.$store.commit('SET_DRAGGING', true)
      },
      dragEndHandler(card){
        this.$store.commit('SET_DRAGGING', false)
      },
      dropHandler(){
        this.moveCards(new PlayStackAction(this.stack, this.bottomCard))
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