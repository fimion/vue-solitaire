import {CARD_RANKS, CARD_SUITS} from "../../constants.js"
import Card from "../../classes/Card.js"
import EmptyCard from "../../classes/EmptyCard.js"
import {PUSH_CARD, POP_CARD} from "./_common.js"

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
    SHUFFLE_DECK({cards}) {
      cards = cards.sort(() => (Math.random() - 0.5))
    },
    FLIP_CARD(state,i){
      state.cards[i].faceUp = !state.cards[i].faceUp
    },
    FLIP_TOP_CARD(state){
      let last = state.cards.length-1
      state.cards[last].faceUp = !state.cards[last].faceUp
    },
    CONCAT_CARDS(state,newCards){
      state.cards = state.cards.concat(newCards)
    },
    PUSH_CARD,
    POP_CARD,
  },
  actions:{
    shuffleDeck({commit}){
      commit('SHUFFLE_DECK')
    },
    flipCard({commit, dispatch, getters}){
      commit('FLIP_TOP_CARD')
      let top = getters.topCard
      commit('POP_CARD')
      dispatch('flop/flopCard', top, {root:true})
    },
  },
}