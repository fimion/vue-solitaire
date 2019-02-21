import {CARD_RANKS, SUIT_OPPOSITES} from "../constants.js"

export class BaseAction{
  constructor(action){
    this.action = action
    this.target = null
  }

  validate(selected){
    return true
  }
}

export class CardFlopAction extends BaseAction{
  constructor(){
    super('deck/flipCard')
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
  validate(selected){
    if(selected.rank === 'K' && this.target.isEmpty){
      return true
    }

    let selectedIndex = CARD_RANKS.indexOf(selected.rank),
        targetIndex = CARD_RANKS.indexOf(this.target.rank),
        isOpposite = SUIT_OPPOSITES[selected.suit].indexOf(this.target.suit)!==-1,
        isNext = targetIndex - selectedIndex === 1

    return isOpposite && isNext
  }
}

