import {CARD_RANKS, CARD_SUITS} from "^/constants.js"
import Card from "^class/Card.js"
import EmptyCard from "^class/EmptyCard.js"
import {
  topCard,
  deckEmpty,
  PUSH_CARD,
  POP_CARD,
  CONCAT_CARDS,
    RESET_CARDS,
} from "^store/_common.js"


function createPlayingDeck() {

  let deck = []

  CARD_SUITS.forEach((suit) => {
    return CARD_RANKS.forEach((rank) => deck.push(new Card(rank, suit)))
  })
  return deck
}


export default {
  namespaced: true,
  state: {
    cards: [],
  },
  getters: {
    topCard,
    deckEmpty,
    nextFlop(state, getters, rootState){
      let flopSize = rootState.options.cardsDrawn
      if(state.cards.length>flopSize){
        return state.cards.slice(state.cards.length - flopSize)
      }
      return state.cards
    },
  },
  mutations: {
    CREATE_DECK(state){
      state.cards = createPlayingDeck()
    },
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
    RESET_CARDS,
  },
  actions: {
    newGame({commit}){
      commit('RESET_CARDS')
      commit('CREATE_DECK')
      commit('SHUFFLE_DECK')
    },
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