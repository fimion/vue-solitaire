<script setup vapor lang="ts">
import { computed } from "vue";
import { useDeckStore } from "@stores/deck.js";
import { useFlopStore } from "@stores/flop.js";
import { useGameStore } from "@stores/game.js";

import { CardFlopAction, DeckResetAction } from "@class/Actions.js";
import { DeckSelection, DeckResetSelection } from "@class/Selections.js";

import type Card from "@class/Card.ts";

const deckStore = useDeckStore();
const flopStore = useFlopStore();
const gameStore = useGameStore();

const topCard = computed(() => deckStore.topCard as Card);
const deckEmpty = computed(() => deckStore.deckEmpty);
const nextFlop = computed(() => deckStore.nextFlop);

const getDeck = computed(() => flopStore.getDeck);

function moveCards(action) {
  gameStore.moveCards(action);
}

function selectCards(selection) {
  gameStore.selectCards(selection);
}

function flipCard() {
  const flop = nextFlop.value;
  selectCards(new DeckSelection(flop));
  moveCards(new CardFlopAction());
}

function resetDeck() {
  const deck = getDeck.value;
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
