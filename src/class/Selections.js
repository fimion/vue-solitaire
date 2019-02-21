export class BaseSelection{
  constructor(cards){
    this.cards = cards
    this.cleanUp = null
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
    this.cleanUp = "play/"+stack+"/sliceCards"
  }
}

export class FinalSelection extends BaseSelection{
  constructor(stack, card){
    super([card])
    this.cleanUp = "final/"+stack+"/popCard"
  }
}