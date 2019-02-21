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
    flipCard({commit, dispatch, getters}) {
      let flop = []
      flop.length = 3
      flop = flop.fill(undefined).map(() => {
        commit('FLIP_TOP_CARD')
        let top = getters.topCard
        commit('POP_CARD')
        return top
      }).filter((e) => !(e instanceof EmptyCard))

      dispatch('flop/flopCards', flop, {root: true})
    },
    async resetDeck({commit, dispatch}){
      let deck = await dispatch('flop/returnDeckPromise', null, {root:true})
      commit('CONCAT_CARDS', deck)
    },
  },
}