<script setup>
import { computed, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import FinalStack from "@components/FinalStack.vue";
import { CARD_SUITS } from "@src/constants.js";
import NewGameButton from "@global/new-game-button.vue";

const Confetti = defineAsyncComponent(
  () => import("./Victory/WinningConfetti.vue"),
);

const store = useStore();

const stacks = computed(() => store.state.final.stacks);

const gameIsWon = computed(() => {
  return CARD_SUITS.map((e) => store.state.final[e].cards.length === 13).reduce(
    (a, b) => b && a,
  );
});
</script>

<template>
  <final-stack
    v-for="suit in stacks"
    :key="'final-stack-' + suit"
    :suit="suit"
  />
  <teleport v-if="gameIsWon" to="#portal">
    <confetti />
    <pop-up>
      <h1>You win!</h1>
      <new-game-button />
    </pop-up>
  </teleport>
</template>

<style>
#final {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: var(--grid-gap);
  grid-template-rows: 1fr;
  align-items: start;
}
</style>
