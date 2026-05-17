import { defineStore } from "pinia";
import EmptyCard from "@class/EmptyCard.js";
import type Card from "@class/Card.ts";

export const useFlopStore = defineStore("flop", {
  state: () => ({
    cards: [] as Card[],
    flop: [] as Card[],
  }),
  getters: {
    topCard(state): Card | EmptyCard {
      const flopLen = state.flop.length;
      const cardsLen = state.cards.length;
      if (flopLen) return state.flop[flopLen - 1];
      if (cardsLen) return state.cards[cardsLen - 1];
      return new EmptyCard();
    },
    getDeck(state): Card[] {
      return [...state.cards, ...state.flop];
    },
  },
  actions: {
    flopCards(newCards: Card[]) {
      const newFlop = [...newCards].reverse().map((e) => {
        e.faceUp = true;
        return e;
      });
      this.cards = this.cards.concat(this.flop);
      this.flop = newFlop;
    },
    returnDeckPromise(): Promise<Card[]> {
      this.cards = this.cards.concat(this.flop);
      this.flop = [];
      this.cards.forEach((e) => { e.faceUp = false; });
      this.cards.reverse();
      const deck = [...this.cards];
      this.cards = [];
      return Promise.resolve(deck);
    },
    resetDeck() {
      this.cards = [];
      this.flop = [];
    },
    popCard() {
      if (this.flop.length) {
        this.flop.pop();
      } else {
        this.cards.pop();
      }
    },
    newGame() {
      this.resetDeck();
    },
  },
  persist: true,
});
