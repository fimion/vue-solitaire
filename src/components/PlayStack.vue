<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import {
  PlayStackAction,
  FinalStackAction,
  ClearSelectionAction,
} from "@class/Actions.js";
import { PlaySelection } from "@class/Selections.js";
import EmptyCard from "@class/EmptyCard.js";
import { useFinalStackTopCard, useSelection } from "./_common.js";

const props = defineProps({
  stack: {
    type: Number,
    required: true,
  },
});

const store = useStore();
const { isSelected: checkIsSelected, currentSelection } = useSelection();

const cards = computed(() => store.state.play[props.stack].cards);
const bottomCard = computed(() => {
  if (cards.value.length) {
    return cards.value[cards.value.length - 1];
  }
  return null;
});

const selectedCard = computed(() => store.getters.selectedCard);

function moveCards(action) {
  store.dispatch("moveCards", action);
}

function selectCards(selection) {
  store.dispatch("selectCards", selection);
}

function cardDisabled(card) {
  return !card.faceUp;
}

const { finalStackTopCardMethod } = useFinalStackTopCard();

function getFinalStackTopCard(suit) {
  return finalStackTopCardMethod(suit);
}

function emptyClickHandler() {
  if (selectedCard.value) {
    moveCards(new PlayStackAction(props.stack, new EmptyCard()));
  }
}

function clickHandler(card) {
  if (selectedCard.value) {
    if (card.card === bottomCard.value.card) {
      moveCards(new PlayStackAction(props.stack, card));
    } else {
      moveCards(new ClearSelectionAction());
    }
  } else {
    if (card.faceUp) {
      let index = cards.value.indexOf(card),
        selection = cards.value.slice(index);
      selectCards(new PlaySelection(props.stack, selection));
    }
  }
}

function dblClickHandler(card) {
  if (bottomCard.value.card === card.card) {
    selectCards(new PlaySelection(props.stack, [card]));
    moveCards(new FinalStackAction(card.suit, getFinalStackTopCard(card.suit)));
  }
}

function isSelected(card) {
  return checkIsSelected(card);
}
</script>

<template>
  <div>
    <card-holder v-if="cards.length === 0" @click="emptyClickHandler">
      <base-svg />
    </card-holder>
    <vertical-spread v-else>
      <playing-card
        v-for="card in cards"
        :key="card.card"
        :card="card"
        :is-selected="isSelected(card, currentSelection)"
        :disabled="cardDisabled(card)"
        @click="clickHandler(card)"
        @dblclick="dblClickHandler(card)"
      />
    </vertical-spread>
  </div>
</template>

<style scoped></style>
