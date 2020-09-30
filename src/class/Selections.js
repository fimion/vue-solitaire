/**
 * @module @class/Selections.js
 * @description Selections are used to select cards in the game and perform a call back action later to "clean up".
 *              You provide the cards to be selected, And they will be sent to the right place.
 */

/** @typedef {import('@/class/Card')} Card */

/**
 * This class defines the basic things all Selections will contain.
 * @class BaseSelection
 */
class BaseSelection{
  /**
   * @constructor
   * @param {Card[]} cards - the cards that are selected.
   */
  constructor(cards){
    /**
     * Our card selection
     * @type {Card[]}
     */
    this.cards = cards

    /**
     * Our clean up action we want to dispatch.
     * @type {string|null}
     */
    this.cleanUp = null

    /**
     *
     * @type {boolean}
     */
    this.hasAction = false
  }

  selectedCard(){
    return this.cards[0]
  }

}

class DeckSelection extends BaseSelection{
  constructor(cards){
    super(cards)
    this.cleanUp = 'deck/popFlop'
  }
}

class DeckResetSelection extends BaseSelection{
  constructor(cards){
    super(cards)
    this.cleanUp = 'flop/resetDeck'
  }
}

class FlopSelection extends BaseSelection{
  constructor(card){
    super([card])
    this.cleanUp = "flop/popCard"
  }
}

class PlaySelection extends BaseSelection{
  constructor(stack, cards){
    super(cards)
    this.cleanUp = "play/"+stack+"/spliceCards"
  }
}

class FinalSelection extends BaseSelection{
  constructor(stack, card){
    super([card])
    this.cleanUp = "final/"+stack+"/popCard"
  }
}

export {
  BaseSelection,
  DeckSelection,
  DeckResetSelection,
  FlopSelection,
  PlaySelection,
  FinalSelection,
}
