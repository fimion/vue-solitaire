import { defineStore } from "pinia";
import { CARD_SUITS, type CardSuit } from "@src/constants.js";
import EmptyCard from "@class/EmptyCard.js";
import type Card from "@class/Card.ts";

type Suit = string;
type SuitStacks = Record<Suit, Card[]>;

function makeInitialStacks(): SuitStacks {
  const stacks: SuitStacks = {};
  CARD_SUITS.forEach((suit) => {
    stacks[suit] = [];
  });
  return stacks;
}

export const useFinalStore = defineStore("final", {
  state: () => ({
    stacks: makeInitialStacks(),
  }),
  getters: {
    suits(): readonly CardSuit[] {
      return CARD_SUITS;
    },
  },
  actions: {
    topCard(suit: Suit): Card | EmptyCard {
      const cards = this.stacks[suit];
      if (!cards.length) return new EmptyCard();
      return cards[cards.length - 1];
    },
    deckEmpty(suit: Suit): boolean {
      return this.stacks[suit].length === 0;
    },
    pushCard(suit: Suit, card: Card) {
      this.stacks[suit].push(card);
    },
    popCard(suit: Suit) {
      this.stacks[suit].pop();
    },
    newGame() {
      CARD_SUITS.forEach((suit) => {
        this.stacks[suit] = [];
      });
    },
  },
  persist: true,
});
