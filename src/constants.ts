/**
 * @module @src/constants.js
 */

/**
 * @description allowed card ranks in a standard 52 card deck
 */
export type CardRank = 'A'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'J'|'Q'|'K';
/**
 * @description allowed suits in a standard 52 card deck
 */
export type CardSuit = 'C' | 'D' | 'H' | 'S';


/**
 * the way to set something read only
 * @constant
 */
export const READ_ONLY: PropertyDescriptor = Object.freeze({
  writable: false,
  configurable: false,
});

/**
 * @description A list of card ranks for a standard 52 card playing deck.
 * @constant
 */
export const CARD_RANKS: readonly CardRank[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
] as const;

/**
 * @description A list of card suits for a standard 52 card playing deck.
 * @constant
 */
export const CARD_SUITS: readonly CardSuit[] = ["C", "D", "H", "S"] as const;

/**
 * @description A list of card suits that are red.
 * @constant
 */
export const SUIT_RED = new Set(["D", "H"]);

/**
 * @description A list of card suits that are black.
 * @constant
 */
export const SUIT_BLACK = new Set(["C", "S"]);

/**
 * @description An object used to look up which suits are opposite the keyed suit.
 * @constant
 */
export const SUIT_OPPOSITES = new Map([
  ["C", SUIT_RED],
  ["D", SUIT_BLACK],
  ["H", SUIT_BLACK],
  ["S", SUIT_RED],
]);

/**
 * A Map of the symbols for the suits.
 * @constant
 */
export const SUIT_SYMBOLS: Record<CardSuit, string> = {
  H: "♥",
  D: "♦",
  C: "♣",
  S: "♠",
};
/**
 * A map of the suits to their names
 * @constant
 */
export const SUIT_NAMES: Record<CardSuit, string> = {
  H: "Hearts",
  D: "Diamonds",
  C: "Clubs",
  S: "Spades",
};

/**
 * A map of the ranks to their names.
 * @constant
 */
export const RANK_NAMES: Record<CardRank, string> = {
  A: "Ace",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
  J: "Jack",
  Q: "Queen",
  K: "King",
};
