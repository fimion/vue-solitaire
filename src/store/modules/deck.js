import {CARD_RANKS, CARD_SUITS} from "^/constants.js"
import Card from "^class/Card.js"
import EmptyCard from "^class/EmptyCard.js"
import {
  topCard,
  deckEmpty,
  PUSH_CARD,
  POP_CARD,
  CONCAT_CARDS,
} from "^store/_common.js"

function createPlayingDeck() {
  return CARD_SUITS.map((suit) => {
    return CARD_RANKS.map((rank) => new Card(rank, suit))
  }).flat()
}


export default {
  namespaced: true,
  state: {
    cards: createPlayingDeck(),
  },
  getters: {
    topCard,
    deckEmpty,
    nextFlop(state){
      if(state.cards.length>3){
        return state.cards.slice(state.cards.length - 3)
      }
      return state.cards
    },
  },
  mutations: {
    SHUFFLE_DECK({cards}) {
      cards = cards.sort(() => (Math.random() - 0.5))
    },
    FLIP_CARD(state, i) {
      state.cards[i].faceUp = !state.cards[i].faceUp
    },
    FLIP_TOP_CARD(state) {
      let last = state.cards.length - 1
      if (last >= 0) {
        state.cards[last].faceUp = !state.cards[last].faceUp
      }
    },
    CONCAT_CARDS,
    PUSH_CARD,
    POP_CARD,
  },
  actions: {
    shuffleDeck({commit}) {
      commit('SHUFFLE_DECK')
    },
    popCard({commit}){
      commit('POP_CARD')
    },
    popFlop({commit, dispatch, getters}) {
      let flop = [...getters.nextFlop]
      flop.forEach(() => {
        commit('POP_CARD')
      })
    },
    async resetDeck({commit, dispatch}, cards){
      let deck = cards.reverse().map(e=>{e.faceUp = false; return e})
      commit('CONCAT_CARDS', deck)
    },
  },
}