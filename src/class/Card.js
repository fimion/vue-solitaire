/**
 * @module @class/Card.js
 */

import {SUIT_NAMES,RANK_NAMES, SUIT_SYMBOLS, READ_ONLY} from '@src/constants.js'

/** @typedef {import('@/constants').CardRank} CardRank*/

/** @typedef {import('@/constants').CardSuit} CardSuit*/



/**
 * A standard representation of a playing card in our app.
 */
class Card{
  /**
   * @constructor
   * @param {String.<CardRank>} rank
   * @param {String.<CardSuit>} suit
   */
  constructor(rank, suit){
    /**
     * @description this card is face up of face down
     * @type {boolean}
     */
    this.faceUp = false

    /**
     * @type {string}
     * @description the card represented as rank+suit
     * @readonly
     */
    this.card = rank+suit

    /**
     * @type {String.<CardRank>}
     * @description the rank of the card
     * @readonly
     */
    this.rank = rank

    /**
     * @type {String.<CardSuit>}
     * @description the suit of the card
     * @readonly
     */
    this.suit = suit

    /**
     * @type {string}
     * @description a text symbol to use in an svg as the suit
     * @readonly
     */
    this.symbol = SUIT_SYMBOLS[suit]

    /**
     * @type {string}
     * @description a version of the card to be used by screen readers
     * @readonly
     */
    this.readableName = RANK_NAMES[rank]+' of '+SUIT_NAMES[suit]

    /**
     * @type {boolean}
     * @description whether the card in the current spot is empty. Always false.
     * @readonly
     */
    this.isEmpty = false
    Object.defineProperties(this, {
      card:READ_ONLY,
      rank: READ_ONLY,
      suit: READ_ONLY,
      symbol: READ_ONLY,
      readableName: READ_ONLY,
      isEmpty:READ_ONLY,
    })
  }
}

export default Card
