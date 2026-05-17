<script setup vapor lang="ts">
import { computed } from "vue";
import { useFinalStore } from "@stores/final.js";
import { useGameStore } from "@stores/game.js";
import { FinalStackAction } from "@class/Actions.js";
import { useSelection } from "@components/_common.js";
import type Card from "@class/Card.ts";

const props = defineProps({
  suit: {
    type: String,
    required: true,
  },
});

const finalStore = useFinalStore();
const gameStore = useGameStore();
const { isSelected: checkIsSelected } = useSelection();

const topCard = computed(() => finalStore.topCard(props.suit) as Card);
const deckEmpty = computed(() => finalStore.deckEmpty(props.suit));

function handleClick() {
  if (gameStore.selectedCard) {
    gameStore.moveCards(
      new FinalStackAction(props.suit, topCard.value),
    );
  }
}

function isSelected(card) {
  return checkIsSelected(card);
}
</script>

<template>
  <card-stack>
    <card-holder v-if="deckEmpty" @click="handleClick">
      <base-svg>
        <use
          :xlink:href="'#' + suit + 'W'"
          class="placeholder"
          x="0"
          y="25"
          height="100"
          width="100"
        />
      </base-svg>
    </card-holder>
    <playing-card
      v-else
      :card="topCard"
      :is-selected="isSelected(topCard)"
      @click="handleClick"
    />
  </card-stack>
</template>

<style scoped></style>
