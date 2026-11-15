import { defineStore } from "pinia";
import Card from "@class/Card.js";
import EmptyCard from "@class/EmptyCard.js";
import {
  createPlayingDeck,
  generateSeed,
  normalizeSeed,
  shuffle,
  type Seed,
} from "@src/utils/shuffle.js";

export { createPlayingDeck };

export const useDeckStore = defineStore("deck", {
  state: () => ({
    cards: [] as Card[],
    /** How many cards to draw from the deck at once. Stored here for persistence. */
    cardsDrawn: 3 as number,
    /** The 64-bit seed that identifies the current game shuffle. */
    seed: null as bigint | null,
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
    newGame(seed: Seed = generateSeed()) {
      this.seed = normalizeSeed(seed);
      this.cards = shuffle(createPlayingDeck(), this.seed);
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
  persist: {
    serializer: {
      serialize: (state) =>
        JSON.stringify(state, (_key, value) =>
          typeof value === "bigint" ? value.toString() : value,
        ),
      deserialize: (raw) => {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.seed !== null && parsed.seed !== undefined) {
          try {
            parsed.seed = BigInt(parsed.seed);
          } catch {
            parsed.seed = null;
          }
        }
        return parsed;
      },
    },
  },
});
