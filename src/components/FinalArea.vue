<script setup vapor lang="ts">
import {computed, defineVaporAsyncComponent, useTemplateRef, VaporComponent} from "vue";
import {useStore} from "vuex";
import FinalStack from "@components/FinalStack.vue";
import {CARD_SUITS} from "@src/constants.js";

const WinningConfetti = defineVaporAsyncComponent(
    () => import("./Victory/WinningConfetti.vue") as Promise<VaporComponent>,
);

const store = useStore();

const stacks = computed(() => store.state.final.stacks);

const gameIsWon = computed(() => {
  const isWin = CARD_SUITS.map((e) => {
    console.log("isWin?", e, store.state.final[e].cards.length, store.state.final[e].cards.map(el=>el.rank))

    return store.state.final[e].cards.length === 13
  }).reduce(
      (a, b) => b && a,
  );
  console.log("WinningConfetti", isWin);
  return isWin
});

const modalRef = useTemplateRef("modal")

function handleWinModalClose(e: string): void {
  if (e !== "start") {
    modalRef.value.dialog.showModal();
  }
}

</script>

<template>
  <final-stack
      v-for="suit in stacks"
      :key="'final-stack-' + suit"
      :suit="suit"
  />
  <teleport v-if="gameIsWon" to="#portal">
    <winning-confetti/>
    <base-modal ref="modal" hide-cancel default-open @close="handleWinModalClose">
      <template #activator><span><!-- Intentionally left blank --></span></template>
      <div class="win-modal">
        <h1>You win!</h1>
        <form method="dialog">
          <new-game-button value="start"/>
        </form>
      </div>
    </base-modal>
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
.win-modal {
  text-align: center;
}
</style>
