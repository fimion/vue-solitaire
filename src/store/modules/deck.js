import {CARD_RANKS, CARD_SUITS} from "../../constants.js"
import {Card} from "../../classes/Card.js"

const FLIP_CARD = 'FLIP_CARD'
const SHUFFLE_DECK = 'SHUFFLE_DECK'

function createPlayingDeck(){
  return CARD_SUITS.map((suit)=>{
    return CARD_RANKS.map((rank)=>new Card(rank, suit))
  }).flat()
}


export default {
  namespaced: true,
  state: {
    cards: createPlayingDeck(),
  },
  getters:{
    topCard({cards}){
      if(!cards.length) return null
      return cards[cards.length-1]
    },
  },
  mutations:{
    [SHUFFLE_DECK]({cards}) {
      cards = cards.sort(() => (Math.random() - 0.5))
    },
    [FLIP_CARD](state,i){
      state.cards[i].faceUp = !state.cards[i].faceUp
    },
  },
  actions:{
    shuffleDeck({commit}){
      commit(SHUFFLE_DECK)
    },
    flipCard({commit},payload){
      commit(FLIP_CARD,payload)
    },
  },
}