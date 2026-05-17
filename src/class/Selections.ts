/**
 * @module @class/Selections.js
 * @description Selections are used to select cards in the game and perform a call back action later to "clean up".
 *              You provide the cards to be selected, And they will be sent to the right place.
 */

/** @typedef {import('@/class/Card')} Card */

import type Card from "@class/Card.ts";
import { useDeckStore } from "@stores/deck.js";
import { useFlopStore } from "@stores/flop.js";
import { usePlayStore } from "@stores/play.js";
import { useFinalStore } from "@stores/final.js";

type CleanUpFn = (cards: Card[]) => void | Promise<void>;

/**
 * This class defines the basic things all Selections will contain.
 * @class BaseSelection
 */
class BaseSelection {
  cards: Card[];
  cleanUp: CleanUpFn | null;
  hasAction: boolean;

  /**
   * @constructor
   * @param {Card[]} cards - the cards that are selected.
   */
  constructor(cards: Card[]) {
    /**
     * Our card selection
     * @type {Card[]}
     */
    this.cards = cards;

    /**
     * Our clean up action we want to dispatch.
     * @type {CleanUpFn|null}
     */
    this.cleanUp = null;

    /**
     *
     * @type {boolean}
     */
    this.hasAction = false;
  }

  selectedCard() {
    return this.cards[0];
  }
}

class DeckSelection extends BaseSelection {
  constructor(cards: Card[]) {
    super(cards);
    this.cleanUp = (c) => useDeckStore().popFlop(c);
  }
}

class DeckResetSelection extends BaseSelection {
  constructor(cards: Card[]) {
    super(cards);
    this.cleanUp = () => useFlopStore().resetDeck();
  }
}

class FlopSelection extends BaseSelection {
  constructor(card: Card) {
    super([card]);
    this.cleanUp = () => useFlopStore().popCard();
  }
}

class PlaySelection extends BaseSelection {
  constructor(stack: number, cards: Card[]) {
    super(cards);
    this.cleanUp = (c) => usePlayStore().spliceCards(stack, c);
  }
}

class FinalSelection extends BaseSelection {
  constructor(suit: string, card: Card) {
    super([card]);
    this.cleanUp = () => useFinalStore().popCard(suit);
  }
}

export {
  BaseSelection,
  DeckSelection,
  DeckResetSelection,
  FlopSelection,
  PlaySelection,
  FinalSelection,
};

