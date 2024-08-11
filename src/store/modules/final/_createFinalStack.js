import {
  POP_CARD,
  PUSH_CARD,
  topCard,
  deckEmpty,
  RESET_CARDS,
} from "@store/_common.js";

export default function () {
  return {
    namespaced: true,
    state: {
      cards: [],
    },
    getters: {
      topCard,
      deckEmpty,
    },
    mutations: {
      PUSH_CARD,
      POP_CARD,
      RESET_CARDS,
    },
    actions: {
      pushCard({ commit }, cardArray) {
        commit("PUSH_CARD", cardArray[0]);
      },
    },
  };
}
