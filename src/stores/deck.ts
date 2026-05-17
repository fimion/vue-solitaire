import { defineStore } from "pinia";
import { CARD_RANKS, CARD_SUITS } from "@src/constants.js";
import Card from "@class/Card.js";
import EmptyCard from "@class/EmptyCard.js";

function createPlayingDeck(): Card[] {
  const deck: Card[] = [];
  CARD_SUITS.forEach((suit) => {
    CARD_RANKS.forEach((rank) => deck.push(new Card(rank, suit)));
  });
  return deck;
}

export const useDeckStore = defineStore("deck", {
  state: () => ({
    cards: [] as Card[],
    /** How many cards to draw from the deck at once. Stored here for persistence. */
    cardsDrawn: 3 as number,
  }),
  getters: {
    topCard(state): Card | EmptyCard {
      if (!state.cards.length) return new EmptyCard();
      return state.cards[state.cards.length - 1];
    },
    deckEmpty(state): boolean {
      return state.cards.length === 0;
    },
    nextFlop(state): Card[] {
      const size = state.cardsDrawn;
      if (state.cards.length > size) {
        return state.cards.slice(state.cards.length - size);
      }
      return [...state.cards];
    },
  },
  actions: {
    newGame() {
      this.cards = createPlayingDeck();
      this.cards = this.cards.sort(() => Math.random() - 0.5);
    },
    popCard() {
      this.cards.pop();
    },
    popFlop(cards: Card[]) {
      cards.forEach(() => this.cards.pop());
    },
    async resetDeck(cards: Card[]) {
      const deck = [...cards].reverse().map((e) => {
        e.faceUp = false;
        return e;
      });
      this.cards = this.cards.concat(deck);
    },
  },
  persist: true,
});
