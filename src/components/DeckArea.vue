<script>
import { createNamespacedHelpers, mapActions } from "vuex";

import { CardFlopAction, DeckResetAction } from "@class/Actions.js";
import { DeckSelection, DeckResetSelection } from "@class/Selections.js";

const { mapGetters: deckGetters } = createNamespacedHelpers("deck");
const { mapGetters: flopGetters } = createNamespacedHelpers("flop");
export default {
  name: "DeckOfCards",
  computed: {
    ...deckGetters(["topCard", "deckEmpty", "nextFlop"]),
    ...flopGetters(["getDeck"]),
  },
  methods: {
    flipCard() {
      let flop = this.nextFlop;
      this.selectCards(new DeckSelection(flop));
      this.moveCards(new CardFlopAction());
    },
    resetDeck() {
      let deck = this.getDeck;
      this.selectCards(new DeckResetSelection(deck));
      this.moveCards(new DeckResetAction());
    },
    ...mapActions(["moveCards", "selectCards"]),
  },
};
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
