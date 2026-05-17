<script setup vapor lang="ts">
import { computed } from "vue";
import { useFlopStore } from "@stores/flop.js";
import { useFinalStore } from "@stores/final.js";
import { useGameStore } from "@stores/game.js";
import { FlopSelection } from "@class/Selections.js";
import { ClearSelectionAction, FinalStackAction } from "@class/Actions.js";
import EmptyCard from "@class/EmptyCard.js";
import { useSelection } from "./_common.js";
import Card from "@class/Card.ts";

const flopStore = useFlopStore();
const finalStore = useFinalStore();
const gameStore = useGameStore();
const { isSelected: checkIsSelected, currentSelection } = useSelection();

const flop = computed(() => flopStore.flop);
const topCard = computed(() => flopStore.topCard as Card);

const isNotEmpty = computed(() => !(topCard.value instanceof EmptyCard));

function moveCards(action) {
  gameStore.moveCards(action);
}

function selectCards(selection) {
  gameStore.selectCards(selection);
}

function isTopCard(card) {
  return card.card === topCard.value.card;
}

function getFinalStackTopCard(suit: string) {
  return finalStore.topCard(suit) as import("@class/Card.ts").default;
}

function clickHandler(card) {
  if (isTopCard(card)) {
    if (currentSelection.value) {
      moveCards(new ClearSelectionAction());
    } else {
      selectCards(new FlopSelection(card));
    }
  }
}

function dblClickHandler(card) {
  if (isTopCard(card)) {
    selectCards(new FlopSelection(card));
    moveCards(new FinalStackAction(card.suit, getFinalStackTopCard(card.suit)));
  }
}

function isSelected(card: Card) {
  return checkIsSelected(card);
}
</script>

<template>
  <card-stack v-if="flop.length === 0" class="card-stack">
    <playing-card
      v-if="isNotEmpty"
      :key="topCard.card"
      :card="topCard"
      :is-selected="isSelected(topCard)"
      @dblclick="dblClickHandler(topCard)"
      @click="clickHandler(topCard)"
    />
  </card-stack>
  <div v-else class="card-flop">
    <playing-card
        v-for="card in flop"
        :key="card.card"
        :disabled="!isTopCard(card)"
        :card="card"
        :is-selected="isSelected(card)"
        @dblclick="dblClickHandler(card)"
        @click="clickHandler(card)"
    />
  </div>

</template>
<style scoped>
.card-stack {
  grid-column: 1 / span 3;
  grid-row-start: 1;
}

.card-flop{
  display: grid;
  grid-template-columns: repeat(6, 1fr) var(--grid-gap);
  grid-template-rows: 1fr;
  align-items: start;
  min-height: 100%;
}
.card-flop:deep(>*:first-of-type) {
  grid-column: 1 / span 3;
  z-index: 1;
  position: relative;
  grid-row-start: 1;
}

.card-flop:deep(>*:nth-of-type(2)) {
  grid-column: 2 / span 3;
  position: relative;
  grid-row-start: 1;
  z-index: 2;
}

.card-flop:deep(>*:nth-of-type(3)) {
  grid-column: 3 / span 3;
  position: relative;
  grid-row-start: 1;
  z-index: 2;
}
</style>
