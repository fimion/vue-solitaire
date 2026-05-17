import { defineStore } from "pinia";
import { useDeckStore } from "./deck.js";
import { useFlopStore } from "./flop.js";
import { useFinalStore } from "./final.js";
import { usePlayStore } from "./play.js";
import type { BaseAction } from "@class/Actions.ts";
import type { BaseSelection } from "@class/Selections.ts";

export const useGameStore = defineStore("game", {
  state: () => ({
    currentSelection: null as BaseSelection | null,
    appUpdated: false,
  }),
  getters: {
    selectedCard(state): import("@class/Card.ts").default | null {
      if (state.currentSelection && state.currentSelection.cards.length) {
        return state.currentSelection.cards[0];
      }
      return null;
    },
  },
  actions: {
    preInit() {
      this.appUpdated = false;
    },
    postInit() {},
    selectCards(selection: BaseSelection | null) {
      this.currentSelection = selection;
    },
    async moveCards(Action: BaseAction) {
      if (this.currentSelection) {
        if (Action.validate(this.currentSelection)) {
          if (Action.action) {
            await Action.action(this.currentSelection.cards);
          }
          if (this.currentSelection?.cleanUp) {
            await this.currentSelection.cleanUp(this.currentSelection.cards);
          }
        }
        this.currentSelection = null;
      }
    },
    markAppUpdated() {
      this.appUpdated = true;
    },
    async newGame() {
      const deckStore = useDeckStore();
      const flopStore = useFlopStore();
      const finalStore = useFinalStore();
      const playStore = usePlayStore();

      finalStore.newGame();
      playStore.newGame();
      flopStore.newGame();
      deckStore.newGame();
      await playStore.initPlayArea();
    },
    setCardsDrawn(value: number) {
      const deckStore = useDeckStore();
      deckStore.cardsDrawn = value;
      return this.newGame();
    },
  },
  persist: {
    pick: ["appUpdated"],
  },
});
