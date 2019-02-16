import EmptyCard from "^classes/EmptyCard.js"


/**
 * Getters
 */

export function topCard({cards}){
  if(!cards.length) return new EmptyCard()
  return cards[cards.length-1]
}

export function deckEmpty({cards}){
  return cards.length === 0
}


/**
 * Mutations
 */
export function PUSH_CARD(state,newCard){
  state.cards.push(newCard)
}

export function POP_CARD(state){
  state.cards.pop()
}

export function CONCAT_CARDS(state,newCards) {
  state.cards = state.cards.concat(newCards)
}