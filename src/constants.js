/**
 * @module @/constants.js
 */

/**
 * @description A list of card ranks for a standard 52 card playing deck.
 * @type {string[]}
 * @constant
 */
export const CARD_RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

/**
 * @description A list of card suits for a standard 52 card playing deck.
 * @type {string[]}
 * @constant
 */
export const CARD_SUITS = ['C', 'D', 'H', 'S']

/**
 * @description A list of card suits that are red.
 * @type {Set.<string>}
 * @constant
 */
export const SUIT_RED = new Set(['D', 'H'])

/**
 * @description A list of card suits that are black.
 * @type {Set.<string>}
 * @constant
 */
export const SUIT_BLACK = new Set(['C', 'S'])

/**
 * @description An object used to look up which suits are opposite the keyed suit.
 * @type {Map.<string,Set.<string>>}
 * @constant
 */
export const SUIT_OPPOSITES = new Map([
  ['C', SUIT_RED],
  ['D', SUIT_BLACK],
  ['H', SUIT_BLACK],
  ['S', SUIT_RED],
])


/**
 * A Map of the symbols for the suits.
 * @type {object.<string,string>}
 * @constant
 */
export const SUIT_SYMBOLS = {
  'H': '♥',
  'D': '♦',
  'C': '♣',
  'S': '♠',
}
/**
 * A map of the suits to their names
 * @type {object.<string,string>}
 * @constant
 */
export const SUIT_NAMES = {
  'H': 'Hearts',
  'D': 'Diamonds',
  'C': 'Clubs',
  'S': 'Spades',
}

/**
 * A map of the ranks to their names.
 * @type {object.<string,string>}
 * @constant
 */
export const RANK_NAMES = {
  'A': 'Ace',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine',
  '10': 'Ten',
  'J': 'Jack',
  'Q': 'Queen',
  'K': 'King',
}
