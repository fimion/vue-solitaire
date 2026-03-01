<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { SUIT_SYMBOLS } from "@src/constants.js";
import { FinalStackAction } from "@class/Actions.js";
import { useSelection } from "@components/_common.js";

const props = defineProps({
  suit: {
    type: String,
    required: true,
  },
});

const store = useStore();
const { isSelected: checkIsSelected } = useSelection();

const symbol = computed(() => SUIT_SYMBOLS[props.suit]);
const topCard = computed(
  () => store.getters["final/" + props.suit + "/topCard"],
);
const deckEmpty = computed(
  () => store.getters["final/" + props.suit + "/deckEmpty"],
);

function handleClick() {
  if (store.getters.selectedCard) {
    store.dispatch(
      "moveCards",
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
