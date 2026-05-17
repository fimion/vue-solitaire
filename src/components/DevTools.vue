<script setup vapor lang="ts">
import { useFinalStore } from "@stores/final.js";
import { usePlayStore } from "@stores/play.js";
import { useFlopStore } from "@stores/flop.js";
import { useDeckStore } from "@stores/deck.js";
import { CARD_RANKS, CARD_SUITS } from "@src/constants.js";
import Card from "@class/Card.js";

const finalStore = useFinalStore();
const playStore = usePlayStore();
const flopStore = useFlopStore();
const deckStore = useDeckStore();

async function createWinCondition() {
  flopStore.resetDeck();
  deckStore.cards = [];
  for (let i = 0; i < 7; i++) {
    playStore.stacks[i] = [];
  }
  finalStore.newGame();
  CARD_SUITS.forEach((suit) => {
    CARD_RANKS.forEach((rank) => {
      const card = new Card(rank, suit);
      card.faceUp = true;
      finalStore.pushCard(suit, card);
    });
  });
}
</script>

<template>
  <span class="devtools">
    <button @click="createWinCondition">Create Win Condition</button>
  </span>
</template>

<style scoped>
.devtools {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
