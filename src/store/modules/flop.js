import {CONCAT_CARDS} from "@store/_common.js"
import EmptyCard from '@class/EmptyCard.js'
import {FlopSelection} from "@class/Selections.js"
import Vue from 'vue'

export default {
  namespaced:true,
  state:{
    cards:[],
    flop:[],
  },
  getters:{
    topCard(state){
      let flopLen = state.flop.length,
          cardsLen = state.cards.length
      if(flopLen){
        return state.flop[flopLen-1]
      }else if(cardsLen){
        return state.cards[cardsLen-1]
      }else{
        return new EmptyCard()
      }
    },
    getDeck({cards,flop}){
      return [...cards, ...flop]
    },
  },
  mutations:{
    SET_CARDS_FACE_DOWN({cards}){
      cards.forEach(e=>{e.faceUp = false})
    },
    REVERSE_CARDS({cards}){
      cards.reverse()
    },
    RESET_CARDS(state){
      state.cards = []
    },
    RESET_DECK(state){
      state.cards = []
      state.flop = []
    },
    FLOP_CARDS(state,payload){
      state.flop = payload
    },
    POP_CARD(state){
      if(state.flop.length){
        state.flop.pop()
      }else{
        state.cards.pop()
      }
    },
    CONCAT_CARDS,
  },
  actions:{
    flopCards({commit,state}, newCards){
      let newFlop = newCards.reverse().map(e=>{e.faceUp = true; return e})
      commit('CONCAT_CARDS', state.flop)
      commit('FLOP_CARDS', newFlop)
    },
    returnDeckPromise({commit, state}){
      commit('CONCAT_CARDS', state.flop)
      commit('FLOP_CARDS',[])
      commit('SET_CARDS_FACE_DOWN')
      commit('REVERSE_CARDS')
      let deck = state.cards
      commit('RESET_CARDS')
      return Promise.resolve(deck)
    },
    resetDeck({commit}){
      commit('RESET_DECK')
    },
    popCard({commit}){
      commit('POP_CARD')
    },
    newGame({dispatch}){
      dispatch('resetDeck')
    },
  },
}
