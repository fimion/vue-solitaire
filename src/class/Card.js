import {SUIT_NAMES,RANK_NAMES, SUIT_SYMBOLS} from '@/constants'

export default class Card{
  constructor(rank, suit){
    this.card = rank+suit
    this.rank = rank
    this.suit = suit
    this.symbol = SUIT_SYMBOLS[suit]
    this.readableName = RANK_NAMES[rank]+' of '+SUIT_NAMES[suit]
    this.faceUp = false
    this.isEmpty = false
  }
}
