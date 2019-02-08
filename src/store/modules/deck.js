import {CARD_RANKS, CARD_SUITS} from "../../constants.js"
import Card from "../../classes/Card.js"
import EmptyCard from "../../classes/EmptyCard.js"

// Mutations
const FLIP_CARD = 'FLIP_CARD'
const SHUFFLE_DECK = 'SHUFFLE_DECK'
const CONCAT_CARDS = 'CONCAT_CARDS'
const PUSH_CARD = 'PUSH_CARD'


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
      if(!cards.length) return new EmptyCard()
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
    [CONCAT_CARDS](state,newCards){
      state.cards = state.cards.concat(newCards)
    },
    [PUSH_CARD](state,newCard){
      state.cards.push(newCard)
    },
  },
  actions:{
    shuffleDeck({commit}){
      commit(SHUFFLE_DECK)
    },
    flipCard({commit, dispatch}){
      commit(FLIP_CARD)
    },
  },
}