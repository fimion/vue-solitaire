import {CARD_RANKS, SUIT_OPPOSITES} from "@/constants.js"

export class BaseAction{
  constructor(action){
    this.action = action
    this.target = null
  }

  validate(selection){
    return true
  }
}

export class ClearSelectionAction extends BaseAction{
  constructor(){
    super(null)
  }
  validate(selection) {
    return false
  }
}


export class CardFlopAction extends BaseAction{
  constructor(){
    super('flop/flopCards')
  }
}

export class DeckResetAction extends BaseAction{
  constructor(){
    super('deck/resetDeck')
  }
}

export class PlayStackAction extends BaseAction{
  constructor(stack, target){
    super('play/'+stack+'/concatCards')
    this.target = target
  }
  validate(selection){
    let selected = selection.selectedCard()
    if(selected.rank === 'K' && this.target.isEmpty){
      return true
    }

    let selectedIndex = CARD_RANKS.indexOf(selected.rank),
        targetIndex = CARD_RANKS.indexOf(this.target.rank),
        isOpposite = SUIT_OPPOSITES.get(selected.suit).has(this.target.suit),
        isNext = targetIndex - selectedIndex === 1

    return isOpposite && isNext
  }
}

export class FinalStackAction extends BaseAction{
  constructor(stack,target){
    super('final/'+stack+'/pushCard')
    this.stack = stack
    this.target = target
  }

  validate(selection){
    if(selection.cards.length !== 1){
      return false
    }
    let selected = selection.selectedCard()
    if(selected.suit !== this.stack) {
      return false
    }
    let targetRankIndex = CARD_RANKS.indexOf(this.target.rank),
        selectedRankIndex = CARD_RANKS.indexOf(selected.rank)

    return selectedRankIndex - targetRankIndex === 1
  }
}

