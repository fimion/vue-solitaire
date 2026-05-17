import { defineStore } from "pinia";
import { useDeckStore } from "./deck.js";
import EmptyCard from "@class/EmptyCard.js";
import type Card from "@class/Card.ts";

const NUM_STACKS = 7;

function makeInitialStacks(): Card[][] {
  return Array.from({ length: NUM_STACKS }, () => []);
}

export const usePlayStore = defineStore("play", {
  state: () => ({
    stacks: makeInitialStacks(),
    ready: false,
  }),
  actions: {
    topCard(stackIndex: number): Card | EmptyCard {
      const cards = this.stacks[stackIndex];
      if (!cards.length) return new EmptyCard();
      return cards[cards.length - 1];
    },
    concatCards(stackIndex: number, newCards: Card[]) {
      this.stacks[stackIndex] = this.stacks[stackIndex].concat(newCards);
    },
    spliceCards(stackIndex: number, cards: Card[]) {
      const stack = this.stacks[stackIndex];
      const index = stack.indexOf(cards[0]);
      this.stacks[stackIndex] = stack.slice(0, index);
      const top = this.stacks[stackIndex];
      if (top.length && !top[top.length - 1].faceUp) {
        top[top.length - 1].faceUp = true;
      }
    },
    async initPlayArea() {
      const deckStore = useDeckStore();

      // Reset stacks
      for (let i = 0; i < NUM_STACKS; i++) {
        this.stacks[i] = [];
      }
      this.ready = false;

      const stacksReady = Array(NUM_STACKS).fill(false);

      while (!this.ready) {
        for (let x = 0; x < NUM_STACKS; x++) {
          const stackLength = this.stacks[x].length;
          if (stackLength < x + 1) {
            await new Promise((res) => setTimeout(res, 0));
            const newCard = deckStore.topCard;
            deckStore.popCard();
            if (stackLength === x) {
              (newCard as Card).faceUp = true;
              stacksReady[x] = true;
            }
            this.concatCards(x, [newCard as Card]);
          }
        }
        if (stacksReady.every(Boolean)) {
          this.ready = true;
        }
      }
    },
    newGame() {
      for (let i = 0; i < NUM_STACKS; i++) {
        this.stacks[i] = [];
      }
      this.ready = false;
    },
  },
  persist: true,
});
