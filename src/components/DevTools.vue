<script setup vapor lang="ts">
import { useStore } from "vuex";
import { CARD_RANKS, CARD_SUITS } from "@src/constants.js";
import Card from "@class/Card.js";

const store = useStore();

function createWinCondition() {
  store.commit("flop/RESET_DECK");
  store.commit("deck/RESET_CARDS");
  store.state.play.stacks.forEach((e, i) => {
    store.commit(`play/${i}/RESET_CARDS`);
  });
  CARD_SUITS.forEach((suit) => {
    CARD_RANKS.forEach((rank) => {
      const card = new Card(rank, suit);
      card.faceUp = true;
      store.commit(`final/${suit}/PUSH_CARD`, card);
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
