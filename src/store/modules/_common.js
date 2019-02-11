export function PUSH_CARD(state,newCard){
  state.cards.push(newCard)
}

export function POP_CARD(state){
  state.cards.pop()
}