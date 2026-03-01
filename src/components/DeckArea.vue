<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import { CardFlopAction, DeckResetAction } from "@class/Actions.js";
import { DeckSelection, DeckResetSelection } from "@class/Selections.js";

const store = useStore();

const topCard = computed(() => store.getters["deck/topCard"]);
const deckEmpty = computed(() => store.getters["deck/deckEmpty"]);
const nextFlop = computed(() => store.getters["deck/nextFlop"]);

const getDeck = computed(() => store.getters["flop/getDeck"]);

function moveCards(action) {
  store.dispatch("moveCards", action);
}

function selectCards(selection) {
  store.dispatch("selectCards", selection);
}

function flipCard() {
  let flop = nextFlop.value;
  selectCards(new DeckSelection(flop));
  moveCards(new CardFlopAction());
}

function resetDeck() {
  let deck = getDeck.value;
  selectCards(new DeckResetSelection(deck));
  moveCards(new DeckResetAction());
}
</script>

<template>
  <card-stack>
    <card-holder v-if="deckEmpty" @click="resetDeck" />
    <playing-card
      v-else
      :key="topCard.card"
      :card="topCard"
      :is-selected="false"
      @click="flipCard"
    />
  </card-stack>
</template>
