<template>
  <horizontal-spread id="flop">
    <card-stack class="card-stack" v-if="flop.length === 0">
      <drag-wrapper @dragstart="dragStartHandler(topCard)"
                    @dragend="dragEndHandler(topCard)"
                    v-if="isNotEmpty">
        <playing-card @click="clickHandler(topCard)"
                      @dblclick="dblClickHandler(topCard)"
                      v-if="isNotEmpty"
                      :key="topCard.card"
                      :card="topCard"></playing-card>
      </drag-wrapper>

    </card-stack>
    <template v-for="card in flop">
      <drag-wrapper v-if="isTopCard(card)"
            class="card-flop"
            @dragstart="dragStartHandler(card)"
            @dragend="dragEndHandler(card)"
            :key="'DragComponent'+card.card">
        <playing-card @dblclick="dblClickHandler(card)"
                      @click="clickHandler(card)"
                      :key="card.card"
                      v-if="displayExceptOnDrag(card)"
                      :card="card" ></playing-card>
      </drag-wrapper>
      <playing-card v-else
                    :disabled="!isTopCard(card)"
                    class="card-flop"
                    :key="card.card"
                    :card="card" ></playing-card>
    </template>
  </horizontal-spread>
</template>

<script>
  import {createNamespacedHelpers,mapActions, mapState} from 'vuex'
  import {FlopSelection} from "../class/Selections.js"
  import {ClearSelectionAction, FinalStackAction} from "../class/Actions.js"
  import EmptyCard from "^class/EmptyCard.js"
  import {finalStackTopCardMethod, cardIsSelected} from "./_common.js"
  const {mapState:flopState, mapGetters:flopGetters} = createNamespacedHelpers('flop')

  export default {
    name: "FlopArea",
    computed:{
      isNotEmpty(){
       return !(this.topCard instanceof EmptyCard)
      },
      ...mapState(['dragging']),
      ...flopState(['cards','flop']),
      ...flopGetters(['topCard']),
    },
    methods:{
      isTopCard(card){
        return card.card === this.topCard.card
      },
      finalStackTopCardMethod,
      cardIsSelected,
      displayExceptOnDrag(card){
        let selected = this.cardIsSelected(card)
        return !(selected && this.dragging)
      },
      dragStartHandler(card){
        this.selectCards(new FlopSelection(card))
        this.$store.commit('SET_DRAGGING', true)
      },
      dragEndHandler(card){
        this.$store.commit('SET_DRAGGING', false)
      },
      clickHandler(card){
        if(this.isTopCard(card)){
          if(this.$store.state.currentSelection){
            this.moveCards(new ClearSelectionAction())
          }
          else{
            this.selectCards(new FlopSelection(card))
          }
        }
      },
      dblClickHandler(card){
        if(this.isTopCard(card)){
          this.selectCards(new FlopSelection(card))
          this.moveCards(new FinalStackAction(card.suit, this.finalStackTopCardMethod(card.suit)))
        }
      },
      ...mapActions(['selectCards','moveCards']),
    },
  }
</script>

<style scoped>
  #flop{
    /*display: grid;
    grid-template-columns: repeat(6, 1fr) var(--grid-gap);
    grid-template-rows: 1fr;
    align-items: start;*/
  }
  .card-stack{
    grid-column: 1/span 3;
    grid-row-start: 1;
  }
  /*.card-flop:first-of-type{
    grid-column: 1/span 3;
    z-index: 1;
    position: relative;
    grid-row-start: 1;
  }
  .card-flop:nth-of-type(2){
    grid-column: 2/span 3;
    position: relative;
    grid-row-start: 1;
    z-index: 2;
  }
  .card-flop:nth-of-type(3){
    grid-column: 3/span 3;
    position: relative;
    grid-row-start: 1;
    z-index: 2;
  }*/
</style>