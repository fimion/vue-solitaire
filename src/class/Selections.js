export class BaseSelection{
  constructor(cards){
    this.cards = cards
    this.cleanUp = null
    this.hasAction = false
  }

  selectedCard(){
    return this.cards[0]
  }

}

export class DeckSelection extends BaseSelection{
  constructor(cards){
    super(cards)
    this.cleanUp = 'deck/popFlop'
  }
}

export class DeckResetSelection extends BaseSelection{
  constructor(cards){
    super(cards)
    this.cleanUp = 'flop/resetDeck'
  }
}

export class FlopSelection extends BaseSelection{
  constructor(card){
    super([card])
    this.cleanUp = "flop/popCard"
  }
}

export class PlaySelection extends BaseSelection{
  constructor(stack, cards){
    super(cards)
    this.cleanUp = "play/"+stack+"/spliceCards"
  }
}

export class FinalSelection extends BaseSelection{
  constructor(stack, card){
    super([card])
    this.cleanUp = "final/"+stack+"/popCard"
  }
}